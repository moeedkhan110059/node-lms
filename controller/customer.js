const Customer = require('../model/customer_model');
const constant = require('../constant/constant');
const contactPerson = require('../model/customer_contact_person')


exports.add_customer = (req,res)=>{
    Customer.findOne({customer_email:req.body.customer_email}).then(customer=>{
        if(!customer){
            new Customer(req.body).save().then(customer=>{
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

exports.get_customer = (req,res)=>{
    Customer.findOne({_id:req.params.id}).then(customer=>{
        if(!customer){
            return res.send({status:constant.NOT_FOUND,message:constant.RECORD_NOT_FOUND});
        }else{
           return res.send({status:constant.SUCCESS_CODE,data:customer})
        }
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.get_customer_list = (req,res)=>{
    const options = {
        page: req.params.page,
        limit: constant.POST_PER_PAGE      
      };
    Customer.paginate({customer_status:1},options).then(customer=>{
       return res.send({status:constant.SUCCESS_CODE,data:customer}) 
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR}) 
    })
}

exports.update_customer = (req,res)=>{
    Customer.findByIdAndUpdate({_id:req.params.id},req.body).then(customer=>{
        return res.send({status:constant.SUCCESS_CODE,message:constant.RECORD_UPDATED})
    }).catch(err=>{
        return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})  
    })
}

exports.add_contact_person = (req,res)=>{
    contactPerson(req.body).save().then(contactperson=>{
        return res.send({status:constant.SUCCESS_CODE,message:constant.ADDED_SUCCESS})
    }).catch(err=>{
        return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.update_contact_person = (req,res)=>{
    contactPerson.findByIdAndUpdate({_id:req.params.id},req.body).then(contactperson=>{
      return res.send({status:constant.SUCCESS_CODE,message:constant.ADDED_SUCCESS})
    }).catch(err=>{
      return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.get_contact_persons = (req,res)=>{
    contactPerson.find({_id:req.params.id,status:1}).then(contactpersons=>{
       return res.send({status:constant.SUCCESS_CODE,data:contactpersons});
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
    })
}