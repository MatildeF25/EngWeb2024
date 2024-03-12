var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('index', { title: 'Pagina Inicial', data: d });
});

router.get('/compositores', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores')
    .then(resposta => {
      res.render('listaCompositores', { lista: resposta.data, data: d, title: 'Lista de Compositores' });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na listagem de compositores' });
    });
});

router.get('/compositores/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('registoCompositor', { data: d, title: 'Registo de Compositor' });
});


router.get('/compositores/:idCompositor', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores/' + req.params.idCompositor)
    .then(resposta => {
      res.render('compositor', { compositor: resposta.data, data: d, title: 'Compositor' + resposta.data.nome });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na listagem do compositor' });
    });
});

router.get('/compositores/edit/:idCompositor', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores/' + req.params.idCompositor)
    .then(resposta => {
      res.render('editarCompositor', { c: resposta.data, data: d, title: 'Editar Compositor' + resposta.data.nome });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na listagem do compositor' });
    });
});


router.get('/compositores/delete/:idCompositor', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.delete('http://localhost:3000/compositores/' + req.params.idCompositor)
    .then(resposta => {
      res.render('compositor', {compositor: resposta.data, data: d, title: 'Confirmação de Eliminação de Compositor' });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na eliminação do compositor' });
    });
});



router.get('/periodo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodo')
    .then(resposta => {
      res.render('listaPeriodo', { lista: resposta.data, data: d, title: 'Lista de Periodos' });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na listagem de periodos' });
    });
});

router.get('/periodo/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('registoPeriodo', { data: d, title: 'Registo de Periodo' });
});


router.get('/periodo/:idPeriodo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodo/' + req.params.idPeriodo)
    .then(resposta => {
      res.render('periodo', { periodo: resposta.data, data: d, title: 'Periodo' + resposta.data.nome });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na listagem do periodo' });
    });
});


router.get('/periodo/edit/:idPeriodo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodo/' + req.params.idPeriodo)
    .then(resposta => {
      res.render('editarPeriodo', { p: resposta.data, data: d, title: 'Editar Periodo' + resposta.data.nome });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na listagem do periodo' });
    });
});

router.get('/periodo/delete/:idPeriodo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.delete('http://localhost:3000/periodo/' + req.params.idPeriodo)
    .then(resposta => {
      res.render('periodo', {periodo: resposta.data, data: d, title: 'Confirmação de Eliminação de Periodo' });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na eliminação do periodo' });
    });
});


router.post('/compositores/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.post('http://localhost:3000/compositores', req.body)
    .then(resposta => {
      res.render('compositor', {compositor: req.body, data: d, title: 'Confirmação de Registo de Compositor' });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro no registo do compositor' });
    });
});


router.post('/periodo/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.post('http://localhost:3000/periodo', req.body)
    .then(resposta => {
      res.render('periodo', {periodo: req.body, data: d, title: 'Confirmação de Registo de Periodo' });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro no registo do periodo' });
    });
});

router.post('/compositores/edit/:idCompositor', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.put('http://localhost:3000/compositores/' + req.params.idCompositor, req.body)
    .then(resposta => {
      res.render('compositor', {compositor: req.body, data: d, title: 'Confirmação de Edição de Compositor' });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na edição do compositor' });
    });
});

router.post('/periodo/edit/:idPeriodo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.put('http://localhost:3000/periodo/' + req.params.idPeriodo, req.body)
    .then(resposta => {
      res.render('periodo', {periodo: req.body, data: d, title: 'Confirmação de Edição de Periodo' });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na edição do periodo' });
    });
});


module.exports = router;
