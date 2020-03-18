const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSchema = new Schema(
    {
        userId:{
            //user obj id
            type:Schema.Types.ObjectId,ref:'User',required:true
        },
        listOfProds:{ 
            prdArr:[
                {
                   prdId:{ type:Schema.Types.ObjectId , ref:'Product'},
                   quantity: Number
                }
            ]
        }
    }
);

// cartSchema.statics.addToCart = function(userId,prdId,qty){
//          console.log(userId+" "+prdId+" "+qty);
         
// }

module.exports = mongoose.model('Cart', cartSchema);
