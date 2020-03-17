const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSchema = new Schema(
    {
        email: String,
        listOfProds:[]

    }
);





module.exports = mongoose.model('Cart', cartSchema);