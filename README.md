## Docker Service Broker

run install.sh in scripts

run generated add_node.sh to all nodes you want to connect to the swarm
this will be different every time you run install.sh to create a fresh swarm

install.sh opens ports, starts the swarm, sets up the database and adds relevant data to add_node.sh

if the computer crashes/reboots run open_ports.sh on all nodes, the swarm should still be intact


depricated contains old versions of files, unused scripts, etc. of particular interest is autostart, install autostart and startdocker(useful with redhat) though they have not been used for a while and such will require modification.


Enhancements:

>Security: Passwords are stored in plaintext, input is not sanitized, docker containers have root privelages(many such as nginx require a bit of work to get running without root privelages).

>Volume Management: At the moment one cannot add volumes to containers for persistent storage, this requires unique identifiers for instances of services to avoid multiple instances using the same folder. If this is added actually having persistent storage is trivial, the mariadb service that runs as part of the Service Broker has persistent storage in /data/mysql.

>Resuming Service: Currently if the swarm is killed while services are running, while it will show the services as running once restarted the services will not actually be runniing. To fix this one would need to extend the worker to check all services with a status of 'running' against the docker swarm to see if it actually is running.

>Redirecting Services: Currently there is no way to redirect services other than by specifying port on startup, if one wants to cleanly switch between production and testing a dynamic reverse proxy needs to be implemeted, see reverse_proxy in depricated for a start.
