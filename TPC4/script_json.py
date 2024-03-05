import json

with open('compositores.json') as f:
    data = json.load(f)

filtered_compositores = []
periodo_dict = {}

for compositor in data['compositores']:
    # Verificar que o compositor tem id, nome, bio, dataNasc, dataObito, periodo
    if all(key in compositor for key in ('id', 'nome', 'bio', 'dataNasc', 'dataObito', 'periodo')):
        filtered_compositores.append(compositor)

data['compositores'] = filtered_compositores

# Processe 
for compositor in data['compositores']:
    if 'periodo' in compositor:
        periodo = compositor['periodo']
        if periodo in periodo_dict:
            periodo_dict[periodo]['compositores'].append(compositor['id'])
        else:
            periodo_dict[periodo] = {
                'id' : "P" + str(len(periodo_dict) + 1),
                'nome': periodo,
                'compositores': [compositor['id']]
            }  

#converter o dicionário para uma lista
periodo_list = list(periodo_dict.values())


#Create a new JSON structure with separate "compositores" list
new_data = {
    'compositores': data['compositores'],
    'periodo': periodo_list
}


# If you want to write the filtered data back to the file
with open('compositores1.json', 'w') as f:
    json.dump(new_data, f, indent=2)
