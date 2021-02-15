const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

let User = new mongoose.Schema({   
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
     profile:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'profile',
         require:true
     },
     status:{
         type:Number,
         require:true
     }

});

let profile = new mongoose.Schema({
    profile_name:{
        type:String,
        require:true
    }
})


module.exports = mongoose.model('profile',profile);
User.plugin(mongoosePaginate);
module.exports = mongoose.model('user',User);