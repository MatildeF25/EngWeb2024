var Atletas = require('../models/atletas');

module.exports.desportos = () => {
    return Atletas
        .distinct('desportos')
        .exec()
}

module.exports.atletasDesporto = desporto => {
    return Atletas
        .find({desportos: desporto})
        .exec()
}