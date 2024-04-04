var Compositores = require('../models/compositore');

module.exports.list_C = () => {
    return Compositores
        .find({},{"compositores":1})
        .sort({nome: 1})
        .exec()
}

module.exports.list_P = () => {
    return Compositores
        .find({},{"periodo":1})
        .sort({nome: 1})
        .exec()
}

module.exports.findCompositor = id => {
    return Compositores
        .findOne({_id: id})
        .exec()
}
module.exports.insert = c => {
    return Compositores.create(c)
}

