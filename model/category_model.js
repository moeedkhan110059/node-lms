const mongoose = require("mongoose");

let categoryModel = new mongoose.Schema({
    category_name:{
        type:String,
        required:true
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

module.exports = mongoose.model('category',categoryModel);