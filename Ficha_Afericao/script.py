import json
import requests

with open('dataset-extra1.json') as f:
    data = json.load(f)    

with open('dataset-extra2.json') as a:
    data += json.load(a)

with open('dataset-extra3.json') as b:
    data += json.load(b)


for result in data:
    response = requests.post('http://localhost:7777/pessoas', json=result)
    
    if response.status_code != 200:
        print('Erro ao inserir pessoa:', response.json())
        break

print('Pessoas inserida com sucesso:', response.json())