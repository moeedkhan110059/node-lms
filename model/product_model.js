const mongoose = require("mongoose");

let productModel = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    category_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },   
    status:{
        type:Number,
        default:1
    },
    added_date:{
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('product',productModel);