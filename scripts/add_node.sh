
#open required ports
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



    docker swarm join \
    --token SWMTKN-1-3rx7t7qy11jdx43y2rsidwqreijp0f1llpc5003991cza0gm6x-cr8y991dc9b09nkhto7uvzf77 \
    148.100.98.185:2377 --advertise-addr $(ip addr show eth0 | grep inet -m 1 | awk '{print $2;}' | cut -d / -f1)
