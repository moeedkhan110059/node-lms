const mongoose  =require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

Supplier = new mongoose.Schema({
    supplier_name : {
        type:String,
        require:true
    },
    supplier_code:{
        type:String,
        require:true
    },
    supplier_email:{
        type:String,
        require:true
    },
    supplier_contact:{
        type:String,
        require:true
    },
    supplier_gst:{
        type:String,
        require:true
    },
    supplier_pan:{
        type:String,
        require:true
    },
    supplier_state:{
        type:Number,
        require:true
    },
    supplier_city:{
        type:Number,
        require:true
    },
    supplier_country:{
        type:Number,
        require:true
    },
    supplier_status:{
        type:Number,        
        default:1
    },
    added_date:{
        type :Date,
        default: Date.now
    }
})

Supplier.plugin(mongoosePaginate);
module.exports = mongoose.model('supplier',Supplier);