# docker-service-broker

To run directly

>./run.sh

Then navigate to browser 127.0.0.1:5000 and view poc



To run as docker swarm

change port rules:

>iptables -I INPUT -p tcp --dport 2377 -j ACCEPT

start docker daemon:

>nohup docker daemon -g /data/docker -H tcp://127.0.0.1:2375 -H unix:///var/run/docker.sock &

start swarm:

>docker swarm init

(will print in console command for other nodes to join)

to run swarm:

>docker stack deploy -c frontend-stack.yml [name it]
