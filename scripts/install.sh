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

#start swarm, append join token to add_node
docker swarm init > add_node.sh
