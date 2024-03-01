import csv
import os
import json

def read_csv(file):
    bd = []
    try:
        with open(file, 'r') as f:
            csv_reader = csv.DictReader(f, delimiter=';')
            for row in csv_reader:
                ## add id
                row['id'] = len(bd)
                bd.append(row) 
    except FileNotFoundError:
        print('Arquivo não encontrado')
    except Exception as e:
        print('Erro desconhecido:', e)
    
    return bd


def write_json(data, file):
    try:
        with open(file, 'w') as f:
            json.dump(data, f, indent=4)
    except Exception as e:
        print('Erro desconhecido:', e)


def pertence(a, b):
    bool = False
    for i in b:
        if a == i['designacao']:
            bool = True
    return bool


def get_especies(data):
    especies = []
    count = 0
    for i in data:
        if not pertence(i['BreedIDDesc'], especies) and i['BreedIDDesc'] != '':
            especies.append({
                "id": count,
                "id_animal":
                "designacao": i['BreedIDDesc'],
                "animal": i['SpeciesIDDesc']
            })
            count += 1
    return especies

def get_animais(data):
    animais = []
    count = 0
    for i in data:
        if not pertence(i['SpeciesIDDesc'], animais) and i['SpeciesIDDesc'] != '':
            animais.append({
                "id": count,
                "designacao": i['SpeciesIDDesc'],
            })
            count += 1
    return animais

file = 'Health_AnimalBites.csv'

bd = read_csv(file)
animais = get_animais(bd)
especies = get_especies(bd)
novaDB = ({
    "ocorrencias": bd,
    "animais": animais,
    "especies": especies
    })

write_json(novaDB, 'Health_AnimalBites.json')