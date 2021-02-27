const Lead = require('../model/lead_model').lead;
const leadProduct = require('../model/lead_model').leadProducts;
const constant  =require("../constant/constant")

exports.add_lead = (req,res)=>{    
    leaddata = {
        lead_no:req.body.lead_no,
        customer:req.body.customer,
        customer_contact_person:req.body.customer_contact_person,
        user:req.body.user        
    }
   new Lead(leaddata).save().then(data=>{
        products =  req.body.product;
        products.forEach(element => {
            element.lead_id = data._id;
            new leadProduct(element).save()            
        });
      return  res.send({status:constant.SUCCESS_CODE,message:constant.ADDED_SUCCESS})
    }).catch(err=>{
      return  res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.get_all_leads = (req,res)=>{
    const options = {
        page: req.params.page,
        limit: constant.POST_PER_PAGE,
        populate:{ path: 'customer customer_contact_person user',select: 'customer_name name email'},       
      };
    Lead.paginate({},options).then(leads=>{
      return  res.send({status:constant.SUCCESS_CODE,data:leads});
    }).catch(err=>{
      return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.get_lead_products = (req,res)=>{
    leadProduct.find({lead_id:req.params.id})
    .populate({path:'product_id'})
    .then(lead_products=>{
        return res.send({status:constant.SUCCESS_CODE,data:lead_products});
    }).catch(err=>{
        return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR});
    })
}

exports.edit_lead = (req,res)=>{
  Lead.findByIdAndUpdate({_id:req.params.id},req.body).then(lead=>{
    return res.send({status:constant.SUCCESS_CODE,message:constant.RECORD_UPDATED})
  }).catch(err=>{
    return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
  });
}

exports.edit_lead_product = (req,res)=>{
  leadProduct.findByIdAndUpdate({_id:req.params.id},req.body).then(leadproduct=>{
    return res.send({status:constant.SUCCESS_CODE,message:constant.RECORD_UPDATED})
  }).catch(err=>{
    return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
  })    
}

exports.delete_lead_product = (req,res)=>{
  leadProduct.findByIdAndDelete({_id:req.params.id}).then(leaddelete=>{
    return res.send({status:constant.SUCCESS_CODE,message:constant.RECORD_DELETED})
  }).catch(err=>{
    return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
  })
}