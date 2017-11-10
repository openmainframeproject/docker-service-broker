#!/bin/bash

echo -ne "\n" | /data/docker-service-broker/scripts/startdocker.sh
iptables -I INPUT -p tcp --dport 2377 -j ACCEPT

exit 0
