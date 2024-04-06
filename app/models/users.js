const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = Schema({
    phone : { type : String, required : true},
    password : { type : String, required : true},
},{
    timestamps: true,

})
module.exports = mongoose.model('User', User)
