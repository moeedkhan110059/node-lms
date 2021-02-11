const axios = require("axios");

exports.home = (req,res)=>{
    axios.get('http://localhost:4000/api/product_list/1').then(response=>{   
        console.log(response.data.data);
        res.render('index',{users:response.data.data.docs,totalPages:response.data.data.totalPages,page:response.data.data.page});
    }).catch(err=>{
        console.log(err.message)
    })
    
}

exports.pagination = (req,res)=>{
    const page = req.params.page;
    axios.get(`http://localhost:4000/api/product_list/${page}`).then(response=>{          
        res.render('index',{users:response.data.data.docs,totalPages:response.data.data.totalPages,page:response.data.data.page});
    }).catch(err=>{
        console.log(err.message)
    })  
}