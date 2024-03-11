var http = require('http');
var axios = require('axios');
const { parse } = require('querystring');

var templates = require('./templates.js')
var static = require('./static.js')


// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// server creation

var server = http.createServer((req,res)=>{
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.staticResource(req)){
        static.serveStaticResource(req,res)
    }
    else{
        switch(req.method){
            case "GET":
            if(req.url == "/"){
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.end(templates.mainPage())
            }
            // GET /compositores    
            else if(req.url == "/compositores"){
                    axios.get('http://localhost:3000/compositores')
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositoresPage(response.data,d))
                        })
                        .catch(erro => {
                            res.end(templates.errorPage(erro,d))
                        })
                }
                // GET /compositores/:id
                else if(/\/compositores\/C[0-9]+$/.test(req.url)){
                    var idCompositor = req.url.split("/")[2]
                    axios.get('http://localhost:3000/compositores/' + idCompositor)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorPage(response.data,d))
                        })
                        .catch(erro => {
                            res.end(templates.errorPage(erro,d))
                        })
                }
                // GET /compositores/registo
                else if(req.url == "/compositores/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.compositor_form(d))
                }
                else if(/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    var idCompositor = req.url.split("/")[3]
                    axios.get('http://localhost:3000/compositores/' + idCompositor)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorFormEdit(response.data,d))
                        })
                        .catch(erro => {
                            res.end(templates.errorPage(erro,d))
                        })
                }
                // GET /compositores/delete/:id
                else if(/\/compositores\/delete\/C[0-9]+$/.test(req.url)){
                    var idCompositor = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/compositores/' + idCompositor)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorDeletePage(response.data,d))
                        })
                        .catch(erro => {
                            res.end(templates.errorPage(erro,d))
                        })
                }
                // GET /periodo
                else if(req.url == "/periodo"){
                    axios.get('http://localhost:3000/periodo')
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoPage(response.data,d))
                        })
                        .catch(erro => {
                            res.end(templates.errorPage(erro,d))
                        })
                }
                // GET /periodo/:id
                else if(/\/periodo\/P[0-9]+$/.test(req.url)){
                    var idPeriodo = req.url.split("/")[2]
                    axios.get('http://localhost:3000/periodo/' + idPeriodo)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodo_idPage(response.data,d))
                        })
                        .catch(erro => {
                            res.end(templates.errorPage(erro,d))
                        })
                }
                // GET /periodo/registo
                else if(req.url == "/periodo/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.periodo_form(d))
                }
                // GET /periodo/edit/:id
                else if(/\/periodo\/edit\/P[0-9]+$/.test(req.url)){
                    var idPeriodo = req.url.split("/")[3]
                    axios.get('http://localhost:3000/periodo/' + idPeriodo)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodo_formEdit(response.data,d))
                        })
                        .catch(erro => {
                            res.end(templates.errorPage(erro,d))
                        })
                }
                // GET /periodo/delete/:id
                else if(/\/periodo\/delete\/P[0-9]+$/.test(req.url)){
                    var idPeriodo = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/periodo/' + idPeriodo)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoDeletePage(response.data,d))
                        })
                        .catch(erro => {
                            res.end(templates.errorPage(erro,d))
                        })
                }

                else{
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage("Erro GET: " + req.url + " não está implementado!",d))
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if(req.url == "/compositores/registo"){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/compositores', result)
                                .then(response => {
                                    // Save the id of the newly created compositor
                                    const compositorId = response.data.id;

                                    // Get all periodos
                                    axios.get('http://localhost:3000/periodo')
                                        .then(periodoResponse => {
                                            // Find the periodo with the same name as result.periodo
                                            const periodo = periodoResponse.data.find(p => p.nome === result.periodo);

                                            if(periodo){
                                                // If the periodo exists, update it with the new compositor id
                                                periodo.compositores.push(compositorId);

                                                axios.put(`http://localhost:3000/periodo/${periodo.id}`, periodo)
                                                    .then(() => {
                                                        res.writeHead(201, {'Content-Type': 'text/html'})
                                                        res.end(templates.compositorPage(result,d))
                                                    })
                                            }
                                            else{
                                                // If the periodo doesn't exist, create a new one with the compositor id
                                                const newPeriodo = {
                                                    id: `P${periodoResponse.data.length + 1}`, // Generate a new id
                                                    nome: result.periodo,
                                                    compositores: [compositorId]
                                                };

                                                axios.post('http://localhost:3000/periodo', newPeriodo)
                                                    .then(() => {
                                                        res.writeHead(201, {'Content-Type': 'text/html'})
                                                        res.end(templates.compositorPage(result,d))
                                                    })
                                            }
                                        })
                                })
                                .catch(erro => {
                                    res.end(templates.errorPage(erro, d))
                                })
                        }
                        else{
                            res.writeHead(404, {'Content-Type': 'text/html'})
                            res.write("<p>Unable to collect data from body..</p>")
                            res.end()
                        }
                    })
                }
                // POST /compositores/edit/C[0-9]+ --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/compositores/' + result.id, result)
                                .then(response => {
                                    res.writeHead(201, {'Content-Type': 'text/html'})
                                    res.end(templates.compositorPage(result,d))
                                })
                                .catch(erro => {
                                    res.end(templates.errorPage(erro, d))
                                })
                        }
                        else{
                            res.writeHead(404, {'Content-Type': 'text/html'})
                            res.write("<p>Unable to collect data from body..</p>")
                            res.end()
                        }
                    })
                }
                // POST /periodo/registo --------------------------------------------------------------------
                else if(req.url == "/periodo/registo"){
                    collectRequestBodyData(req, result => {
                        if(result){
                            if(typeof result.compositores === 'string') {
                                comp = result.compositores.split(",")
                                result.compositores = comp;
                            }
                            axios.post('http://localhost:3000/periodo', result)
                                .then(response => {
                                    res.writeHead(201, {'Content-Type': 'text/html'})
                                    res.end(templates.periodo_idPage(result,d))
                                })
                                .catch(erro => {
                                    res.end(templates.errorPage(erro, d))
                                })
                        }
                        else{
                            res.writeHead(404, {'Content-Type': 'text/html'})
                            res.write("<p>Unable to collect data from body..</p>")
                            res.end()
                        }
                    })
                }
                // POST /periodo/edit/P[0-9]+ --------------------------------------------------------------------
                else if(/\/periodo\/edit\/P[0-9]+/.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            if(typeof result.compositores === 'string') {
                                comp = result.compositores.split(",")
                                result.compositores = comp;
                            }
                            axios.put('http://localhost:3000/periodo/' + result.id, result)
                                .then(response => {
                                    res.writeHead(201, {'Content-Type': 'text/html'})
                                    res.end(templates.periodo_idPage(result,d))
                                })
                                .catch(erro => {
                                    console.log(erro)
                                    res.end(templates.errorPage(erro, d))
                                })
                        }
                        else{
                            res.writeHead(404, {'Content-Type': 'text/html'})
                            res.write("<p>Unable to collect data from body..</p>")
                            res.end()
                        }
                    })
                }
                else{
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage("Erro POST: " + req.url + " não está implementado!",d))
                }
                break
            
            default:
                break
        }
    }
})


server.listen(7771, ()=>{
    console.log("Servidor à escuta na porta 7771...")
})
