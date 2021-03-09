const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors = require('cors')
const connectionDB = require("./database/connection");
const middleware  =require("./middleware/middleware");
const path = require("path")

const app = express();

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }))

// dotenv load 
dotenv.config({path:'config.env'})


// enable cors
app.use(cors());

// database connection
connectionDB.dbConnection();

// port initialize 
PORT = process.env.PORT || 8080;



// authenticat all route

app.use('/api/*',(req,res,next)=>{
    AuthFreeUrl = [
        '/api/user/login'
    ];
    var free = AuthFreeUrl.includes(req.baseUrl);
    if(free){
        next();
    }else{
        middleware.verifyToken(req,res,next);
    }
})

// set engine
app.set("view engine","ejs");

// set static path
app.use('/js', express.static(path.join(__dirname, 'assets/js')))
app.use('/css', express.static(path.join(__dirname, 'assets/css')))
app.use('/img', express.static(path.join(__dirname, 'assets/img')))
app.use('/temp', express.static(path.join(__dirname, 'temp')))

// set view pat,
///app.set("views");

// route import
app.use('/api',require("./routes/route"));
app.use('/api/customer',require('./routes/customer_route'));
app.use('/api/supplier',require('./routes/supplier_route'));
app.use('/api/user',require('./routes/user_route'));
app.use('/api/lead',require('./routes/lead_route'));
app.use('/api/quotation',require('./routes/quotation_route'));
app.use('/api/order',require('./routes/order_route'));


// second route
app.use('/',require('./routes/render_route'));

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})

