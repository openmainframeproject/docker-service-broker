mkdir /data/mysql
mysqldb="$(docker ps --format '{{.Names}}' | grep 'sql')"
docker exec -i $(docker service ls | grep sql | awk '{print $1;}') mysql -h 127.0.0.1 -uroot -ppass <<< "create database ServiceBroker;"
docker exec -i "$mysqldb" mysql -uroot -ppass ServiceBroker < /data/docker-service-broker/scripts/create.sql
