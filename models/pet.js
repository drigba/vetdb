const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Pet = db.model('Pet', {
    id: {type: String, unique: true},
    nev: String,
    faj: String,
    kor: Number,
    tulaj: [{
        nev:  {type :String},
        from:{type :Date},
        to: {type :Date},
        tel: {type: String}
    }],
    szuletes: {type: Date},
    utoljara: {type: Date} ,
    gyogyszerek: [{
        nev: {
            type: Schema.Types.ObjectId,
            ref:'Medicine'
        },
        datum : {type: Date}
    }]
});   

module.exports = Pet;