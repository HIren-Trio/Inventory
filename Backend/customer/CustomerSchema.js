const { default: mongoose } = require("mongoose");

module.exports = {
    firstname : { type : String ,required:true},
    lastname : { type : String ,required:true},
    email : { type : String ,required:true,unique:true},
    password : { type : String ,required:true},
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}