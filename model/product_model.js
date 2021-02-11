const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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
productModel.plugin(mongoosePaginate);

module.exports = mongoose.model('product',productModel);