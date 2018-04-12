import json
import requests
import sys
import time
import os

baseUrl= "http://148.100.98.185:3000"


while True:

	time.sleep(1)
	#TODO: add handling for capacityAvailable with regards to docker swarm
	#capacityAvailable = True
	r = requests.get(baseUrl+'/getQueuedServices')
	result = json.dumps(r.json()[0])
	jsonData = json.loads(result

	fields = jsonData['fields']
	
	#for i in jsonData:
	name = jsonData['name']
	
	#check if in services
	r2 = requests.get(baseUrl+'/getServices')
	for i in r2.json():
		#print(i)
		jsonData = i
		#for i in jsonData:
		if jsonData['name'] == name:
			print('docker service create ' + jsonData['parameters'] + ' ' + jsonData['image'])
			os.system('docker service create ' + jsonData['parameters'] + ' ' + jsonData['image'])

	

