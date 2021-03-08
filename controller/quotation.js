const Lead = require('../model/lead_model').lead
const Quotation = require('../model/quotation_model').quotations
const QuotationProduct = require("../model/quotation_model").quotationProduct
const constant = require("../constant/constant");
const siteSetting = require("../common/common_function")
const mongoose = require("mongoose")
const Product = require("../model/product_model")
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");


exports.add_quotation = (req,res)=>{

   Lead.findOne({_id:req.body.lead_id}).then(async lead=>{
       if(!lead){
           return res.send({status:constant.NOT_FOUND,message:constant.RECORD_NOT_FOUND})
       }else{
        const Increament  = await siteSetting.commonSetting("quotation"); 
           let newQuotation = {
            quotation_no:"QUOTE-"+Increament.quotation,
            customer:lead.customer,
            customer_contact_person:lead.customer_contact_person,
            lead_id:req.body.lead_id
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


exports.get_quotation_list = (req,res)=>{
    Quotation.aggregate([
        {
        $lookup :{
            from:"customers",
            localField:"customer",
            foreignField:"_id",
            as:"customer_detail"
        }},
        { $unwind: "$customer_detail" },
        { $match:{"customer_detail.customer_status":1} },
        {
            $lookup:{
                from:"customer_contact_people",
                localField:"customer_contact_person",
                foreignField:"_id",
                as:"contact_person_detail"
            }
        },
        { $unwind: "$contact_person_detail" },
        {
            $lookup:{
                from:"leads",
                localField:"lead_id",
                foreignField:"_id",
                as:"lead"
            }
        },
        { $unwind: "$lead" },
        {
            $lookup:{
                from:"quotationproducts",
                localField:"_id",
                foreignField:"quotation_id",
                as:"quotation_product"
            }
        },        
        { $project : {
            quotation_no:1,
            status:1,
            customer:1,
            customer_status:"$customer_detail.customer_status",
            customer_name:"$customer_detail.customer_name",
            customer_code:"$customer_detail.customer_code",
            customer_email:"$customer_detail.customer_email",
            customer_contact:"$customer_detail.customer_contact",
            customer_gst:"$customer_detail.customer_gst",
            customer_code:"$customer_detail.customer_code",
            contact_person_name:"$contact_person_detail.name",
            contact_person_email:"$contact_person_detail.email",
            quotation_product:"$quotation_product"
        }}
        
    ]).then(quotation=>{
       return res.send({status:constant.SUCCESS_CODE,data:quotation})
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR});
    })

}

exports.quotation_pdf = (req,res)=>{
    Quotation.aggregate([{
        $match:{_id:mongoose.Types.ObjectId(req.params.id)}
        },
        {
        $lookup :{
            from:"customers",
            localField:"customer",
            foreignField:"_id",
            as:"customer_detail"
        }},
        { $unwind: "$customer_detail" },
        {
            $lookup:{
                from:"customer_contact_people",
                localField:"customer_contact_person",
                foreignField:"_id",
                as:"contact_person_detail"
            }
        },
        { $unwind: "$contact_person_detail" },
        {
            $lookup:{
                from:"leads",
                localField:"lead_id",
                foreignField:"_id",
                as:"lead"
            }
        },
        { $unwind: "$lead" },
        {
            $lookup:{
                from:"quotationproducts",
                localField:"_id",
                foreignField:"quotation_id",
                as:"quotation_product"
            }
        },
       
        { $project : {
            quotation_no:1,
            status:1,
            customer:1,
            customer_status:"$customer_detail.customer_status",
            customer_name:"$customer_detail.customer_name",
            customer_code:"$customer_detail.customer_code",
            customer_email:"$customer_detail.customer_email",
            customer_contact:"$customer_detail.customer_contact",
            customer_gst:"$customer_detail.customer_gst",
            customer_code:"$customer_detail.customer_code",
            contact_person_name:"$contact_person_detail.name",
            contact_person_email:"$contact_person_detail.email",
            quotation_product:"$quotation_product"
            
        }}       
    ]).then(async quotation=>{
        /**
         * product name against quotation product
         */        
        const quoted_product = quotation[0].quotation_product;
        const resObj = quoted_product.map(async (result, i) =>{ 
             const product_ = await Product.findOne({_id:result.product_id})           
             result.productname = product_.product_name
             return result;
        });
        const quotation_p = await Promise.all(resObj);
        /**
         * generate quotation pdf
         */
        file_name = new Date().getTime().toString();
        quotation[0].quotation_product = quotation_p
        const filePathName = path.resolve(__dirname, '../views/templates/','quotation-template.ejs');
        const htmlString = fs.readFileSync(filePathName).toString();
        let  options = { format: 'Letter' };
        const ejsData = ejs.render(htmlString, {quotation:quotation});
        pdf.create(ejsData, options).toFile('temp/quotation'+file_name+'.pdf',(err, response) => {
            if (err){
                return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR});
            } else{
                return res.send({status:constant.SUCCESS_CODE,data:response});
            }            
        });        
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR});
    })       
 }

 exports.add_quotation_product = (req,res)=>{
     QuotationProduct(req.body).save().then(quotation_product=>{
         return res.send({status:constant.SUCCESS_CODE,message:constant.ADDED_SUCCESS})
     }).catch(err=>{
         return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
     })
 }

 exports.delete_quotation_product = (req,res)=>{
     QuotationProduct.findByIdAndDelete({_id:req.params.id}).then(response=>{
         return res.send({status:constant.SUCCESS_CODE,message:constant.RECORD_DELETED})
     }).catch(err=>{
         return res.send({status:constant.DATABASE,message:err.message|| constant.DATABASE_ERROR})
     })
 }

 exports.update_quotation_product = (req,res)=>{
    QuotationProduct.findByIdAndUpdate({_id:req.params.id},req.body).then(response=>{
        return res.send({status:constant.SUCCESS_CODE,message:constant.RECORD_UPDATED})
    }).catch(err=>{
        return res.send({status:constant.DATABASE,message:err.message|| constant.DATABASE_ERROR})
    })
}


 exports.quotation_detail = (req,res)=>{
    Quotation.aggregate([
        {
            $match:{_id:mongoose.Types.ObjectId(req.params.id)}
        },
        {
        $lookup :{
            from:"customers",
            localField:"customer",
            foreignField:"_id",
            as:"customer_detail"
        }},
        { $unwind: "$customer_detail" },
        { $match:{"customer_detail.customer_status":1} },
        {
            $lookup:{
                from:"customer_contact_people",
                localField:"customer_contact_person",
                foreignField:"_id",
                as:"contact_person_detail"
            }
        },
        { $unwind: "$contact_person_detail" },
        {
            $lookup:{
                from:"leads",
                localField:"lead_id",
                foreignField:"_id",
                as:"lead"
            }
        },
        { $unwind: "$lead" },
        {
            $lookup:{
                from:"quotationproducts",
                localField:"_id",
                foreignField:"quotation_id",
                as:"quotation_product"
            }
        },        
        { $project : {
            quotation_no:1,
            status:1,
            customer:1,
            customer_status:"$customer_detail.customer_status",
            customer_name:"$customer_detail.customer_name",
            customer_code:"$customer_detail.customer_code",
            customer_email:"$customer_detail.customer_email",
            customer_contact:"$customer_detail.customer_contact",
            customer_gst:"$customer_detail.customer_gst",
            customer_code:"$customer_detail.customer_code",
            contact_person_name:"$contact_person_detail.name",
            contact_person_email:"$contact_person_detail.email",
            quotation_product:"$quotation_product"
        }}
        
    ]).then(quotation=>{
       return res.send({status:constant.SUCCESS_CODE,data:quotation})
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR});
    })

 }