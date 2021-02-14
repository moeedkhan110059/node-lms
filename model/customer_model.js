const mongoose  =require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

Customer = new mongoose.Schema({
    customer_name : {
        type:String,
        require:true
    },
    customer_code:{
        type:String,
        require:true
    },
    customer_email:{
        type:String,
        require:true
    },
    customer_contact:{
        type:String,
        require:true
    },
    customer_gst:{
        type:String,
        require:true
    },
    customer_pan:{
        type:String,
        require:true
    },
    customer_state:{
        type:Number,
        require:true
    },
    customer_city:{
        type:Number,
        require:true
    },
    customer_country:{
        type:Number,
        require:true
    },
    customer_status:{
        type:Number,        
        default:1
    },
    added_date:{
        type :Date,
        default: Date.now
    }
})

Customer.plugin(mongoosePaginate);
module.exports = mongoose.model('customer',Customer);