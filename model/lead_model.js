const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

Lead = new mongoose.Schema({
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
        ref:'user'
    }

});

// lead product schema

leadProductSchema = new mongoose.Schema({
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

Lead.plugin(mongoosePaginate);
const leadProducts = mongoose.model('leadproduct',leadProductSchema);
const lead = mongoose.model('lead',Lead);

module.exports = {
    leadProducts:leadProducts,
    lead:lead
}