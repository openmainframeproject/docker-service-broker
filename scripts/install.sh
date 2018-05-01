#persistent mariadb file location
mkdir /data/mysql

#required ports
iptables -I INPUT -p tcp --dport 3306 -j ACCEPT  #mysql
iptables -I INPUT -p tcp --dport 8080 -j ACCEPT  #visualizer
iptables -I INPUT -p tcp --dport 3000 -j ACCEPT  #API
iptables -I INPUT -p tcp --dport 2376 -j ACCEPT  #docker swarm
iptables -I INPUT -p tcp --dport 2377 -j ACCEPT  #docker swarm
iptables -I INPUT -p tcp --dport 7946 -j ACCEPT  #docker ingress
iptables -I INPUT -p udp --dport 7946 -j ACCEPT  #docker ingress
iptables -I INPUT -p udp --dport 4789 -j ACCEPT  #docker ingress
iptables -I INPUT -p tcp --dport 8000 -j ACCEPT  #frontend

#ports for client started services, less than 1024 requires root, while containers have root currently there should be restrictions
for i in {9000..9500}
do
    iptables -I INPUT -p tcp --dport $i -j ACCEPT
    iptables -I INPUT -p udp --dport $i -j ACCEPT
done

#overwrite add_node to avoid repeated appends
cat add_node > add_node.sh

#start swarm, append join token to add_node
ip_command="\$(ip addr show eth0 | grep inet -m 1 | awk '{print \$2;}' | cut -d "/" -f1)"
eval echo $ip_command
ip_result=$(eval echo $ip_command)
echo $ip_result
docker swarm init --advertise-addr $ip_result | sed -n 5,7p >> add_node.sh

#remove sed trailing newline
printf %s "$(< add_node.sh)" > add_node.sh

#append advertise ip with dynamic command to get worker ip
printf -- " --advertise-addr " >> add_node.sh
printf "$ip_command"  >> add_node.sh

#start swarm
./start_swarm.sh

#delay for mysql to startup, wait does not work as create service finishes prior to mysql starting
sleep 10

#setup mysql
./setupsql.sh
