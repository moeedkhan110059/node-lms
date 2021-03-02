const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment'); 

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
        type: Number,
        default: moment().valueOf()      
    }
    
});
categoryModel.plugin(mongoosePaginate);
module.exports = mongoose.model('category',categoryModel);