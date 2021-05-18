  
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/L1N5IV', {ignoreUndefined : true});

module.exports = mongoose;