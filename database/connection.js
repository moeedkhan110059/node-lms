const mongoose = require("mongoose");
exports.dbConnection = async ()=>{
    try{
     await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("dbconnection successfully")
    } catch {
        process.exit();
    }
}
