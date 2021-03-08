const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

order = new mongoose.Schema({
    order_no:{
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
    quotation_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quotation"
    },
    tax_igst:{
        type:mongoose.Types.Decimal128,       
    },
    tax_cgst:{
        type:mongoose.Types.Decimal128,      
    },
    tax_sgst:{
        type:mongoose.Types.Decimal128,       
    },
    igst_value:{
        type:mongoose.Types.Decimal128,       
    },
    cgst_value:{
        type:mongoose.Types.Decimal128,      
    },
    sgst_value:{
        type:mongoose.Types.Decimal128,       
    },
    discount:{
        type:Number
    },
    discount_value:{
        type:mongoose.Types.Decimal128, 
    },
    subtotal:{
        type:mongoose.Types.Decimal128, // taxable amount
    },
    grand_total:{
        type:mongoose.Types.Decimal128,
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

// Order product schema

orderProductSchema = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quantity:{
        type:Number,
        required:true
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order"
    },
    unit_price:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    total_price:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

order.plugin(mongoosePaginate);
const orderProduct = mongoose.model('orderproduct',orderProductSchema);
const orders = mongoose.model('order',order);

module.exports = {
    orderProduct:orderProduct,
    orders:orders
}