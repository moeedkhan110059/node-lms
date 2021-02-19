const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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
categoryModel.plugin(mongoosePaginate);
module.exports = mongoose.model('category',categoryModel);