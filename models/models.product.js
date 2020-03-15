const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema(
    {
        category: String,
        price: Number,
        name: String,
        image: String,
        description: String
    }
);





module.exports = mongoose.model('Product', productSchema);