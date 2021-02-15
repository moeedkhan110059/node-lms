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

module.exports = mongoose.model('lead',Lead);