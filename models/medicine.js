const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Medicine = db.model('Medicine', {
    nev: String,
    hatoanyag: String,
    bevitel: String,
    csomag: Number,
    erosseg: Number,
    felhasznalas:[{type: String}] ,
    adagolas: String,
    veny: Boolean,
    mellekhatas: [{
        tipus: String,
        nagyonritka: String,
        ritka: String,
        nemgyakori: String,
        gyakori: String,
    }],
});

module.exports = Medicine;