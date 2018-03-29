mysqldb="$(docker ps --format '{{.Names}}' | grep 'sql')"
docker exec -i 86b3c61efa97 mysql -h 127.0.0.1 -uroot -ppass <<< "create database ServiceBroker;"
docker exec -i "$mysqldb" mysql -uroot -ppass ServiceBroker < /data/docker-service-broker/scripts/create.sql
