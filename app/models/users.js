const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const User = Schema({
    phone : { type : String, required : true},
    password : { type : String, required : true},
},{
    timestamps: true,

})
User.statics.CreateToken = async(id, SecretId , exp) => {
    return await jwt.sign({id}, SecretId, { expiresIn :  exp} )
}
module.exports = mongoose.model('User', User)
