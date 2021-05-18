const PetModel = require('./models/pet');
const MedicineModel = require('./models/medicine');
const moment = require('moment');
var express = require('express');

const Pet = require('./models/pet');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded());
app.locals.moment = moment;
// Load routing
require('./route/route.js')(app);
var server = app.listen(3000, function () {
    console.log("On: 3000")
});

