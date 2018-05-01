mysqldb="$(docker container ls | grep 'sql' | awk '{print $1}')"
#docker exec -i $mysqldb mysql -uroot -ppass <<< "create database services;"
docker exec -i $mysqldb mysql -uroot -ppass services < /data/docker-service-broker/scripts/create.sql
