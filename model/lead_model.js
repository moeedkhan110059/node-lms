const mongoose = require("mongoose");

let Lead = new mongoose.Schema({
    lead_no:{
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
    status:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }

});

// lead product schema

leadProduct = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quantity:{
        type:String,
        required:true
    },
    lead_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"lead"
    },
    price:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('leadproduct',leadProduct,'leadProduct');
module.exports = mongoose.model('lead',Lead,'lead');