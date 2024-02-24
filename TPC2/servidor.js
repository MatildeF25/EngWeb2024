var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req,res){
    var exp = /^\/c\d+$/
    console.log(req.method + ' ' + req.url)
    var q = url.parse(req.url, true)
    console.log(q.pathname)
    if(exp.test(q.pathname)){
        var path = 'Paginas/' + q.pathname.slice(1) + '.html'
        console.log(path)
        fs.readFile(path, function(erro, data){
            if(erro){
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<p>Pedido não suportado.</p>')
                res.write('<pre>' + q.pathname + '</pre>')
                res.end()
            }
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(data)
            res.end()
        })
    }
    else if(q.pathname == '/w3.css'){
        fs.readFile('Paginas/w3.css', function(erro, data){
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(data)
            res.end()
        })
    }
    else if(q.pathname == '/style.css'){
        fs.readFile('Paginas/style.css', function(erro, data){
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(data)
            res.end()
        })
    }
    else if (q.pathname == '/'){
        fs.readFile('Paginas/index.html', function(erro, data){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(data)
            res.end()
        })
    }
    else{
        res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
        res.write('<p>Pedido não suportado.</p>')
        res.write('<pre>' + q.pathname + '</pre>')
        res.end()
    }
}).listen(7777)