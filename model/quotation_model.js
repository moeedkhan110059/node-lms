const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

quotation = new mongoose.Schema({
    quotation_no:{
        type:String,
        required:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer'
    },
    customer_contact_person:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer_contact_person'
    },
    lead_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'lead'
    },
    status:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});

// lead product schema

quotationProductSchema = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quantity:{
        type:String,
        required:true
    },
    quotation_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quotation"
    },
    price:{
        type:String,
        required:true
    }
})

quotation.plugin(mongoosePaginate);
const quotationProduct = mongoose.model('quotationproduct',quotationProductSchema);
const quotations = mongoose.model('quotation',quotation);

module.exports = {
    quotationProduct:quotationProduct,
    quotations:quotations
}