from flask import Flask, render_template, request
import shlex, subprocess
from OpenSSL import SSL
import MySQLdb

app = Flask(__name__)

db = MySQLdb.connect(host="148.100.99.53",      # your host(manager node) 
                     port=3306,
                     user="root",           # username
                     passwd="pass",         # password
                     db="ServiceBroker")       # name of database
c = db.cursor()

def runCMD(cmd):
    args = shlex.split(cmd)
    subprocess.Popen(cmd, shell=True)
    return 'test'

def action(serviceData):
    if serviceData[1] == "CMD":
	return runCMD(serviceData[0])
    else:
	return False

@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
	c.execute("select service_name from services")
        serviceData = list(c.fetchall())
	for i in range(0, len(serviceData)):
	    serviceData[i] = serviceData[i][0]
        return render_template("test.html", services=serviceData)
    else:
	c.execute("select service_command, service_type from services where service_name=%s", [request.form['docker']])
	serviceData = c.fetchone()
        return request.form['docker']+" ran successfully and output was "+action(serviceData)
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=443, ssl_context=('./certs/cert.pem', './certs/key.pem'))
