const Category = require("../model/category_model")
const constant = require("../constant/constant");
const Product  = require("../model/product_model")

exports.addCategory  = (req,res)=>{
    console.log(req.body);
    new Category(req.body).save().then(category=>{
        return res.send({status:constant.SUCCESS_CODE,message:constant.ADDED_SUCCESS})

    }).catch(err=>{
        return res.send({status:constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.getCategories =(req,res)=>{
    const option={
        page:req.params.page,
        limit: constant.POST_PER_PAGE
    }
    Category.paginate({},option).then(category=>{
       return res.send({status:constant.SUCCESS_CODE,data:category})
    }).catch(err=>{
        return res.send({status:constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.getAllCategories = (req,res)=>{
    Category.find({}).then(category=>{
        return res.send({status:constant.SUCCESS_CODE,data:category})
     }).catch(err=>{
         return res.send({status:constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR})
     })
}



exports.getSingleCategory = (req,res)=>{   
    Category.findOne({_id:req.params.id}).then(category=>{        
        if(!category){
         return   res.send({status:constant.NOT_FOUND,message:constant.RECORD_NOT_FOUND})
        }else{
          return  res.send({status:constant.SUCCESS_CODE,data:category})  
        }
    }).catch(err=>{
        return res.send({status:constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.deleteCategory = (req,res)=>{
    Category.findByIdAndDelete({_id:req.params.id}).then(record=>{       
            Product.deleteMany({category_id:req.params.id}).then(product=>{
                return res.send({status:constant.SUCCESS_CODE,message:constant.RECORD_DELETED})
            })
        
    }).catch(err=>{
        return res.send({status:constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.updateCategory = (req,res)=>{
    Category.updateOne({_id:req.params.id},req.body).then(category=>{
        return res.send({status:constant.SUCCESS_CODE,message:constant.RECORD_UPDATED})
    }).catch(err=>{
        return res.send({status:constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR}) 
    })
}
