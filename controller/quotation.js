const Lead = require('../model/lead_model').lead
const Quotation = require('../model/quotation_model').quotations
const QuotationProduct = require("../model/quotation_model").quotationProduct
const constant = require("../constant/constant");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");


exports.add_quotation = (req,res)=>{

   Lead.findOne({_id:req.body.lead_id}).then(lead=>{
       if(!lead){
           return res.send({status:constant.NOT_FOUND,message:constant.RECORD_NOT_FOUND})
       }else{
           let newQuotation = {
            quotation_no:req.body.quotation_no,
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
        { $unwind: "$quotation_product" },
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
        }}
        
    ]).then(quotation=>{
       return res.send({status:constant.SUCCESS_CODE,data:quotation})
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR});
    })

}

exports.quotation_pdf = (req,res)=>{
    let data = {};
    const filePathName = path.resolve(__dirname, '../views/templates/','quotation-template.ejs');
    const htmlString = fs.readFileSync(filePathName).toString();
    let  options = { format: 'Letter' };
    const ejsData = ejs.render(htmlString, data);
    pdf.create(ejsData, options).toFile('temp/generatedfile.pdf',(err, response) => {
        if (err) return console.log(err);
        console.log(response)
    }); 
       
 }