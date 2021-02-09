const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
var cors = require('cors')
const connectionDB = require("./database/connection");
const route  = require("./routes/route")

const app = express();

// parse application/json
app.use(bodyParser.json())

// dotenv load 
dotenv.config({path:'config.env'})


// enable cors
app.use(cors());

// database connection
connectionDB.dbConnection();

// port initialize 
PORT = process.env.PORT || 8080;

// route import
app.use('/api', route);

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})

