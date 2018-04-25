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
      port = -1
      servicePort = -1
      image = '-1'
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

      try:
        for i in json.loads(fields):
          #print(i)
          if i['label'] == 'Port':
            port = i['value']
      except:
        try:
          print(json.loads(fields))
          if json.loads(fields)['label'] == 'Port':
            port = json.loads(fields)['value']
        except:
          print("no fields")
          port = -1


      try:
        for i in json.loads(fields):
          #print(i)
          if i['label'] == 'Service Port':
            servicePort = i['value']
      except:
        try:
          print(json.loads(fields))
          if json.loads(fields)['label'] == 'Service Port':
            servicePort = json.loads(fields)['value']
        except:
          print("no fields")
          servicePort = -1


      try:
        for i in json.loads(fields):
          #print(i)
          if i['label'] == 'image':
            image = i['value']
      except:
        try:
          print(json.loads(fields))
          if json.loads(fields)['label'] == 'image':
            image = json.loads(fields)['value']
        except:
          print("no fields")
          image = -1


      for i in r2.json():
        #print(i)
        jsonData = i
        #for i in jsonData:
        if jsonData['name'] == name:
          if str(jsonData['parameters']) != 'None':
            if port != -1:
              #servicePort = jsonData['port']
              print('docker service create ' + jsonData['parameters'] + ' -p ' + str(port) + ":" + str(servicePort) + ' --name ' + name + str(ID) + ' ' + image)
              os.system('docker service create ' + jsonData['parameters'] + ' -p ' + str(port) + ":" + str(servicePort) + ' --name ' + name + str(ID) + ' ' + image)
            else:
              print('docker service create ' + jsonData['parameters'] + ' -p ' + str(port) + ":" + str(servicePort) + ' --name ' + name + str(ID) + ' ' + image)
              os.system('docker service create ' + str(jsonData['parameters']) + ' -p ' + str(port) + ":" + str(servicePort) + ' --name ' + name + str(ID) + ' ' + image)
          else:

            if port != -1:
              #servicePort = jsonData['port']
              print('docker service create ' + ' -p ' + str(port) + ":" + str(servicePort) + ' --name ' + name + str(ID) + ' ' + image)
              os.system('docker service create ' + ' -p ' + str(port) + ":" + str(servicePort) + ' --name ' + name + str(ID) + ' ' + image)
            else:
              print('docker service create ' + ' -p ' + str(port) + ":" + str(servicePort) + ' --name ' + name + str(ID) + ' ' + image)
              os.system('docker service create ' + ' -p ' + str(port) + ":" + str(servicePort) + ' --name ' + name + str(ID) + ' ' + image)

          Data = {'ID' : ID}
          req = requests.post(baseUrl+'/runningStatus', json=Data)

          print(req.text)
    except:
      print("no queued services")
