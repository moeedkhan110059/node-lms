const User = require('../model/user_model');
const constant = require('../constant/constant');


exports.add_user = (req,res)=>{
    User.findOne({email:req.body.email}).then(user=>{
        if(!user){
            new User(req.body).save().then(user=>{
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

exports.get_user = (req,res)=>{
    User.findOne({_id:req.params.id}).then(user=>{
        if(!user){
            return res.send({status:constant.NOT_FOUND,message:constant.RECORD_NOT_FOUND});
        }else{
           return res.send({status:constant.SUCCESS_CODE,data:user})
        }
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})
    })
}

exports.get_user_list = (req,res)=>{
    const options = {
        page: req.params.page,
        limit: constant.POST_PER_PAGE      
      };
    User.paginate({},options).then(users=>{
       return res.send({status:constant.SUCCESS_CODE,data:users}) 
    }).catch(err=>{
       return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR}) 
    })
}

exports.update_user = (req,res)=>{
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(user=>{
        return res.send({status:constant.SUCCESS_CODE,message:constant.RECORD_UPDATED})
    }).catch(err=>{
        return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR})  
    })
}