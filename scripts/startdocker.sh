nohup docker daemon -g /data/docker -H tcp://127.0.0.1:2375 -H unix:///var/run/docker.sock &
wait %1

exit 0
