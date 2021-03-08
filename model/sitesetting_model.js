const mongoose  =require("mongoose");


siteSetting = new mongoose.Schema({
    site_name : {
        type:String,
        require:true
    },
    site_email:{
        type:String,
        require:true
    },
    site_gstin:{
        type:String,
        require:true
    },
    site_pen:{
        type:String,
        require:true
    },
    site_cin:{
        type:String,
        require:true
    },
    site_address:{
        type:String,
        require:true
    },
    site_state:{
        type:Number,
        require:true
    },
    site_city:{
        type:Number,
        require:true
    },
    country_country:{
        type:Number,
        require:true
    },
    lead:{
        type:Number        
    },
    quotation:{
        type:Number        
    },
    order:{
        type:Number        
    },
    shipment:{
        type:Number        
    },
    invoice:{
        type:Number        
    },
    
})


module.exports = mongoose.model('sitesetting',siteSetting);