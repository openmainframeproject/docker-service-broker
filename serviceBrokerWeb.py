from flask import Flask, render_template, request
import subprocess
app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        return render_template("test.html", fun="test")
    else:
        l = subprocess.check_output(['echo', 'test'])
        return request.form['docker']+" ran successfully and output was "+l
