const siteSetting = require("../model/sitesetting_model");
const mongoose = require("mongoose");

/**
 * @param: passing key need to increament (auto increament)
 * @returns: data will return
 */

exports.commonSetting = (field)=>{
       return new Promise((resolve,reject)=>{
        let condition = {};
        switch (field) {
            case "lead":
               condition = {$inc:{lead:1}} 
                break;
            case "quotation":
                condition = {$inc:{quotation:1}} 
                break;
            case "order":
                condition = {$inc:{order:1}} 
                break;
            case "shipment":
                condition = {$inc:{shipment:1}} 
                break;
            case "invoice":
                condition = {$inc:{shipment:1}} 
                break;
        }
        siteSetting.findOneAndUpdate({_id:mongoose.Types.ObjectId("604506bcfb0e4f6bfc9ab34b")},condition).then(setting=>{
            return resolve(setting)
        }).catch(err=>{
            return reject(err)
        })
    })

}