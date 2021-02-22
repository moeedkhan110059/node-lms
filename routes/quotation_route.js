const express = require("express");
const route = express.Router();
const quotation  = require('../controller/quotation');




/**
 * @description: add quotation
 * @method: POST / add_quotation 
 */
route.post('/add_quotation',quotation.add_quotation)










module.exports = route;