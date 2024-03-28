var Compositores = require('../models/compositores');

module.exports.list = () => {
    return Compositores
        .find()
        .sort({nome: 1})
        .exec()
}

module.exports.findById = id => {
    return Compositores
        .findOne({id: id})
        .exec()
}

module.exports.insert = c => {
    return Compositores.create(c)
}

