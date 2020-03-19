const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId : { type : Schema.Types.ObjectId, ref:'User',required:true },

    allHistory : {
        dailyHistory : [
            {
                prdIdWithPrice : [
                    {
                        prdId : { type:Schema.Types.ObjectId , ref:'Product'},
                        oldPrice : Number,
                        quantity : Number     
                    }
                ],
                date : Date
            }
        ]
    }
});

module.exports = mongoose.model('Order', orderSchema);