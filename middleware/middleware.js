const jwt = require("jsonwebtoken");
const constant = require('../constant/constant');

exports.verifyToken = (req,res,next)=>{
    bearerHeader = req.headers['authorization'];    
    if(typeof bearerHeader != 'undefined'){
       bearerToken =  bearerHeader.split(" ");
       token = bearerToken[1];
        jwt.verify(token,'secret',(err,decord)=>{
            if(err){
                res.send({status:constant.INVALID_TOKEN,message:constant.INVALID_TOKEN_MSG})
            }else{
                req.user = decord;
                console.log(decord);
                next();
            }
        })
    }else {
        res.send({status:constant.INVALID_TOKEN,message:constant.TOKEN_NOT_FOUND})
    }
}