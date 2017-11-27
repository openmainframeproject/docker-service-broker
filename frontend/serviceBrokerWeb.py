from flask import Flask, render_template, request, jsonify
import subprocess
from OpenSSL import SSL
import MySQLdb

app = Flask(__name__)

db = MySQLdb.connect(host="148.100.99.53",      # your host(manager node) 
                     port=3306,
                     user="root",           # username
                     passwd="pass",         # password
                     db="ServiceBroker")       # name of database

def query_db():
    cur = db.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('select * from services')
    cache = cur.fetchall()
    cur.connection.close()
    return cache

cache = query_db()

@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        return jsonify(cache)
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=443, ssl_context=('./certs/cert.pem', './certs/key.pem'))
