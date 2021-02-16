const mongoose = require("mongoose");

let contactPerson = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer'
     },
     name:{
         type:String,
         require:true
     },
     email:{
         type:String,
         require:true
     },
     contact:{
         type:String,
         require:true
     },
     designation:{
         type:String,
         require:true
     },
     status:{
         type:Number, // active 1
         require:true
     }

});

module.exports = mongoose.model('customer_contact_person',contactPerson)