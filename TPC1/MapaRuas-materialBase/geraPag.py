import os
import xml.etree.ElementTree as ET 


bd = []

def extract_description(file):
    tree = ET.parse(file)
    root = tree.getroot()

    description = ""
    for child in root:
        if child.tag == "corpo":
            for corpo in child:
                if corpo.tag == "para":
                    para = ""
                    for text in corpo.itertext():
                        para += text
                    for lugar in corpo.findall('lugar'):
                        para = para.replace(lugar.text, f"<b>{lugar.text}</b>")
                    for data in corpo.findall('data'):
                        para = para.replace(data.text, f"<i>{data.text}</i>")
                    for entidade in corpo.findall('entidade'):
                        para = para.replace(entidade.text, f"<b>{entidade.text}</b>")
                    description += "<p>" + para + "</p>\n"

    return description

for file in os.listdir("texto"):
    numero = ""  # Initialize numero
    nome = ""  # Initialize nome
    # criar um tuplo imagem, legenda
    imagem = ""
    legenda = ""
    figura = []
    casas = []
    n = ""
    dono = ""
    custo = ""
    description = extract_description("texto/"+file)
    tree = ET.parse("texto/"+file)
    root = tree.getroot()
    
    if file.endswith(".xml"):
        for child in root:
            if child.tag == "meta":
                for meta in child:
                    if meta.tag == "número":
                        numero = meta.text
                    if meta.tag == "nome":
                        nome = meta.text
            if child.tag == "corpo":
                for corpo in child:
                    if corpo.tag == "figura":
                        for fig in corpo:
                            if fig.tag == "imagem":
                                imagem =  "../MapaRuas-materialBase" + fig.attrib['path'][2:]
                            if fig.tag == "legenda":
                                legenda = fig.text
                        figura.append((imagem, legenda))
                    if corpo.tag == "lista-casas":
                        for lista in corpo:
                            if lista.tag == "casa":
                                for casa in lista:
                                    if casa.tag == "número":
                                        n = casa.text
                                    if casa.tag == "enfiteuta":
                                        dono = casa.text
                                    if casa.tag == "foro":
                                        custo = casa.text
                                    if casa.tag == "desc":
                                        para = casa.find('para')
                                        if para is not None:
                                            d = ""
                                            para = ""
                                            for text in casa.itertext():
                                                para += text
                                            for lugar in casa.findall('lugar'):
                                                para = para.replace(lugar.text, f"<b>{lugar.text}</b>")
                                            for data in casa.findall('data'):
                                                para = para.replace(data.text, f"<b>{data.text}</b>")
                                            for entidade in casa.findall('entidade'):
                                                para = para.replace(entidade.text, f"<b>{entidade.text}</b>")
                                            d = "<p>" + para + "</p>\n"
                                casas.append((n, dono, custo, d))
                            
        bd.append((file[:-4], numero, nome, figura, description,casas))


bd.sort(key=lambda x: int(x[1]))



for e in bd:
    f = open('../Ruas_site/'+ e[0] + '.html', "w")
    poshtml = f"""
<!DOCTYPE html>
<html>
<head>
    <title>{e[2]}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="w3.css">
    <meta charset="utf-8"/>
</head>
<body>
    <div class="w3-card-4">
        <header class="w3-container w3-purple">
            <h1>{e[2]}</h1>
        </header>

        <div class="w3-container w3-center">
            <h3>Vistas</h3>
        </div>
        <div class="w3-row-padding w3-margin-top">
    """
    
    i = 1
    for fig in e[3]:
        
        if(i==3):
            poshtml += f"""
            </div>
            <div class="w3-row-padding w3-margin-top">
                <div class="w3-third">
                    <div class="w3-card">
                        <img src="{fig[0]}" style="width:100%">
                        <div class="w3-container">
                            <h5>{fig[1]}</h5>
                        </div>
                    </div>
                </div> 
            """
        else:
            poshtml += f"""
                <div class="w3-third">
                    <div class="w3-card">
                        <img src="{fig[0]}" style="width:100%">
                        <div class="w3-container">
                            <h5>{fig[1]}</h5>
                        </div>
                    </div>
                </div>
            """
        i += 1

    
    poshtml += f"""
        </div>
        <div class="w3-container w3-center">
            <h3>Descrição</h3>
        </div>

        {e[4]}
        <div class="w3-container w3-center">
              <h3>Casas</h3>
            </div>

            <table class="w3-table-all">
              <thead>
                <tr class="w3-pink">
                  <th>Casa</th>
                  <th>Dono</th>
                  <th>Custo</th>
                  <th>Sobre</th>
                </tr>
              </thead>    
    """

    for casa in e[5]:
        poshtml += f"""
              <tr>
                <td>{casa[0]}</td>
                <td>{casa[1]}</td>
                <td>{casa[2]}</td>
                <td>{casa[3]}</td>
              </tr>

    """
    
    
    
    prehtml = f"""
            </table>
        <br></br>
        <footer class="w3-container w3-purple">
            <h5>Generated by EMDApp::EngWeb2024::a95319</h5>
        </footer>            
    </div>
</body>
</html> 
    """



    paghtml = poshtml + prehtml
    
    f.write(paghtml)
    f.close()






