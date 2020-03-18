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
                   prdId:{ type:Schema.Types.ObjectId,ref:'Product'},
                   quantity: Number
                }
            ]
        }
    }
);

cartSchema.statics.addToCart = function(userId,prdId,qty){
        // console.log(userId+" "+prdId+" "+qty);
     this.findOne({userId:userId})
     .then(user=>{ console.log(user+"============")
         if(user){

         }
     })
     .catch(e=>console.log(e));
}

module.exports = mongoose.model('Cart', cartSchema);
//  Cart.findOne({userId:req.session.user._id})
//     .then(user=>{

//         if(user){

//         }else{
//             let newCart=new Cart({
//                 userId:req.session.user.,
//                 listOfProds:{
//                     prdArr: prdArr.push({
//                         prdId: req.body.id,
//                         quantity: req.body.quantity
//                     })
//                 }
//             }).save();
//         }

//       })
//     .catch(err=>{
//     console.log(err);
// })
