import json

# Load the JSON data
with open('filmes2.json') as f:
    data = json.load(f)

# Create separate dictionaries for "cast" and "genres"
cast_dict = {}
genres_dict = {}

# Iterate over the films
for film in data['filmes']:
    # Process the "cast" field
    if 'cast' in film:
        for cast_member in film['cast']:
            # Check if this cast member already exists in the dictionary
            if cast_member in cast_dict:
                # Cast member found, append the film to its "Filmes" list
                cast_dict[cast_member]['Filmes'].append(film['_id']['$oid'])
            else:
                # Cast member not found, create a new entry
                cast_dict[cast_member] = {
                    'id' : "A" + str(len(cast_dict) + 1),
                    'Nome': cast_member,
                    'Filmes': [film['_id']['$oid']]
                }

    # Process the "genres" field
    if 'genres' in film:
        for genre in film['genres']:
            # Check if this genre already exists in the dictionary
            if genre in genres_dict:
                # Genre found, append the film to its "Filmes" list
                genres_dict[genre]['Filmes'].append(film['_id']['$oid'])
            else:
                # Genre not found, create a new entry
                genres_dict[genre] = {
                    'id' : "G" + str(len(genres_dict) + 1),
                    'genre': genre,
                    'Filmes': [film['_id']['$oid']]
                }

# Convert the dictionaries to lists
cast_list = list(cast_dict.values())
genres_list = list(genres_dict.values())

# Create a new JSON structure with separate "cast" and "genres" lists
new_data = {
    'filmes': data['filmes'],
    'cast': cast_list,
    'genres': genres_list
}

# Save the new data to a JSON file
with open('filmes.json', 'w') as f:
    json.dump(new_data, f, indent=2)