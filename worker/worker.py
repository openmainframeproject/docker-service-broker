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
    try:
      r = requests.get(baseUrl+'/getQueuedServices')
      result = json.dumps(r.json()[0])
      jsonData = json.loads(result)
      fields = jsonData['fields']
      ID = jsonData['ID']
      fields = jsonData['fields']
      #for i in jsonData:
      name = jsonData['name']
      #check if in services
      r2 = requests.get(baseUrl+'/getServices')
    
      
      for i in json.loads(fields):
        #print(i)
        if i['label'] == 'Port':
          port = i['value']
        else:
          port = -1
      for i in r2.json():
        #print(i)
        jsonData = i
        #for i in jsonData:
        if jsonData['name'] == name:
          if port != -1:
            servicePort = jsonData['port']
            print('docker service create ' + jsonData['parameters'] + ' -p ' + str(port) + ":" + str(servicePort) + ' --name ' + name + str(ID) + ' ' + jsonData['image'])
            os.system('docker service create ' + jsonData['parameters'] + ' -p ' + str(port) + ":" + str(servicePort) + ' --name ' + name + str(ID) + ' ' + jsonData['image'])
          else:
            print('docker service create ' + jsonData['parameters'] + ' --name ' + name + str(ID) + ' ' + jsonData['image'])
            os.system('docker service create ' + jsonData['parameters'] + ' --name ' + name + str(ID) + ' ' + jsonData['image'])

          Data = {'ID' : ID}
          req = requests.post(baseUrl+'/runningStatus', json=Data)

          print(req.text)
    except:
      print("no queued services")
