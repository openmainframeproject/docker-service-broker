cp ./startup.service /etc/systemd/system/startup.service
chmod 664 /etc/systemd/system/startup.service
systemctl daemon-reload
systemctl enable startup
