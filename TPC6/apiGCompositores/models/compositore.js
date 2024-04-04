var mongoose = require('mongoose');

var compositoresSchema = new mongoose.Schema({
    data :[
        {
            compositores: {
                id: String,
                nome: String,
                bio: String,
                dataNasc: String,
                dataObito: String,
                periodo: String 
            },
            periodo: {
                id: String,
                nome: String,
                compositores: [String] // This array would contain the 'id' of composers
            }
        }
    ]
}, { versionKey: false });


module.exports = mongoose.model('compositore', compositoresSchema, 'compositores');
