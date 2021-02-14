const Supplier = require('../model/supplier_model');
const constant = require('../constant/constant');


exports.add_supplier = (req,res)=>{
    Supplier.findOne({supplier_email:req.body.supplier_email}).then(supplier=>{
        if(!supplier){
            new Supplier(req.body).save().then(data=>{
              return  res.send({status:constant.SUCCESS_CODE,message:constant.ADDED_SUCCESS})
            }).catch(err=>{
               return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
            })
        }else{
           return res.send({status:constant.ALREADY_EXIST,message:constant.ALREADY_EXIST_MSG})
        }
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.get_supplier = (req,res)=>{
    Supplier.findOne({_id:req.params.id}).then(supplier=>{
        if(!supplier){
            return res.send({status:constant.NOT_FOUND,message:constant.RECORD_NOT_FOUND});
        }else{
           return res.send({status:constant.SUCCESS_CODE,data:supplier})
        }
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.get_supplier_list = (req,res)=>{
    const options = {
        page: req.params.page,
        limit: constant.POST_PER_PAGE      
      };
    Supplier.paginate({supplier_status:1},options).then(supplier=>{
       return res.send({status:constant.SUCCESS_CODE,data:supplier}) 
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR}) 
    })
}

exports.update_supplier = (req,res)=>{
    Supplier.findByIdAndUpdate({_id:req.params.id},req.body).then(supplier=>{
        return res.send({status:constant.SUCCESS_CODE,message:constant.RECORD_UPDATED})
    }).catch(err=>{
        return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})  
    })
}