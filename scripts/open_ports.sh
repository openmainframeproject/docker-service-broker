#open required ports
iptables -I INPUT -p tcp --dport 2376 -j ACCEPT  #docker swarm
iptables -I INPUT -p tcp --dport 2377 -j ACCEPT  #docker swarm
iptables -I INPUT -p tcp --dport 7946 -j ACCEPT  #docker ingress
iptables -I INPUT -p udp --dport 7946 -j ACCEPT  #docker ingress
iptables -I INPUT -p udp --dport 4789 -j ACCEPT  #docker ingress
iptables -I INPUT -p tcp --dport 8000 -j ACCEPT  #frontend
