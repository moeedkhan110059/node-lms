const Lead = require('../model/lead_model').lead
const Quotation = require('../model/quotation_model').quotations
const QuotationProduct = require("../model/quotation_model").quotationProduct
const constant = require("../constant/constant");

exports.add_quotation = (req,res)=>{
   Lead.findOne({_id:req.body.id}).then(lead=>{
       if(!lead){
           return res.send({status:constant.NOT_FOUND,message:constant.RECORD_NOT_FOUND})
       }else{
           let newQuotation = {
            quotation_no:req.body.quotation_no,
            customer:lead.customer,
            customer_contact_person:lead.customer_contact_person,
            lead_id:req.body.id
           };
           Quotation(newQuotation).save().then(quotation=>{

            products =  req.body.product;
            products.forEach(element => {
                element.quotation_id = quotation._id;
                new QuotationProduct(element).save();            
            });
          return  res.send({status:constant.SUCCESS_CODE,message:constant.ADDED_SUCCESS})

           }).catch(err=>{
                return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR}) 
           })
       }
   }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
   })
}