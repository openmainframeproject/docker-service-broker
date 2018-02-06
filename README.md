# docker-service-broker

SLES

on every node
>iptables -I INPUT -p tcp --dport 2377 -j ACCEPT

Manager node
>docker swarm init

worker nodes(requires at least one)
copy paste output of swarm init on manager

start services
>docker stack deploy -c frontend-stack.yml [name it]


RHEL

>iptables -I INPUT -p tcp --dport 2377 -j ACCEPT

start docker daemon:

>nohup docker daemon -g /data/docker -H tcp://127.0.0.1:2375 -H unix:///var/run/docker.sock &

start swarm:

>docker swarm init

(will print in console command for other nodes to join)

to run swarm:

>docker stack deploy -c frontend-stack.yml [name it]
