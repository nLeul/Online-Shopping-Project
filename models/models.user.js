const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        firstname: String,
        lastname: String,
        age: Number,
        email: String,
        password: String,
        role:String
    }
);





module.exports = mongoose.model('User', userSchema);