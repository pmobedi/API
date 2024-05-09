const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Multimedia = Schema({
    name : {type : String, required : true},
    dimWidth : {type : String},
    dimHeight : {type : String},
    format : { type : String},
    dir : { type : String, requited : true}
})
module.exports = mongoose.model('Multimedia', Multimedia)