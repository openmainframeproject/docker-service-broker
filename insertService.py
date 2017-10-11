import sqlite3

db = sqlite3.connect("serviceBrokerWeb.db")
c = db.cursor()
name = raw_input("Enter the name of the service: ")
print "Pick a service type\n1. OS Command \n2.(Not Yet IMPLEMENTED) Docker"
serviceDict = {"1":"CMD", "2":"Docker"}
while True:
	type = raw_input("Enter a number [1-2]: ")
	if type in serviceDict.keys():
		type = serviceDict[type]
		break
	else:
		print "Invalid entry, try again."
command = raw_input("Please enter your command: ")
c.execute("insert into services (service_name, service_type, service_command) values (?, ?, ?);", [name, type, command])
db.commit()
print "Service inserted!"
db.close()

