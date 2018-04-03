import json
import requests
import sys

capacityAvailable = True
baseUrl= "http://148.100.98.185:3000"
id = sys.argv[1]


r = requests.get(baseUrl+'/getQueuedServices')
jsonData = r.json()
print(jsonData)
if jsonData and capacityAvailable:
	r = requests.get(baseUrl+'/claim?id='+str(jsonData[0]['ID'])+"&workerid="+str(id))
	print(r.text)

