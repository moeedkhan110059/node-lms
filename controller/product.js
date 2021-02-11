const Category = require("../model/category_model")
const constant = require("../constant/constant");
const Product  = require("../model/product_model")

exports.addProduct  = (req,res)=>{
    new Product(req.body).save().then(category=>{
        return res.send({"status":constant.SUCCESS_CODE,message:constant.ADDED_SUCCESS})

    }).catch(err=>{
        return res.send({"status":constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.getProducts =(req,res)=>{
    // let postPerPage = 1;

    const option={
        page:req.params.page,
        limit: 1,
        populate:{ path: 'category_id',select: 'category_name'}
       }  
    Product.paginate({},option).then(product=>{
        return res.send({"status":constant.SUCCESS_CODE,"data":product})
    }).catch(err=>{
        return res.send({"status":constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR})
    })



    // let page = req.params.page >= 1 ? req.params.page : 1;
    // page = page - 1 ;  
  
    // Product.
    // find({})
    // .populate({ path: 'category_id',select: 'category_name'})
    // .limit(postPerPage)
    // .skip(postPerPage * page)
    // .then(product=>{
    //    return res.send({"status":constant.SUCCESS_CODE,"data":product})
    // }).catch(err=>{
    //     return res.send({"status":constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR})
    // })
}

exports.getSingleProduct = (req,res)=>{   
    Product.findOne({_id:req.params.id}).then(product=>{        
        if(!product){
         return   res.send({"status":constant.NOT_FOUND,message:constant.RECORD_NOT_FOUND})
        }else{
          return  res.send({"status":constant.SUCCESS_CODE,"data":product})  
        }
    }).catch(err=>{
        return res.send({"status":constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.deleteProduct = (req,res)=>{       
     Product.deleteMany({_id:req.params.id}).then(product=>{
            return res.send({"status":constant.SUCCESS_CODE,message:constant.RECORD_DELETED})         
        
    }).catch(err=>{
        return res.send({"status":constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.updateProduct = (req,res)=>{
    Product.updateOne({_id:req.params.id},req.body).then(category=>{
        return res.send({"status":constant.SUCCESS_CODE,message:constant.RECORD_UPDATED})
    }).catch(err=>{
        return res.send({"status":constant.ERROR_CODE,message:err.message || constant.DATABASE_ERROR}) 
    })
}
