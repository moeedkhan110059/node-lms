const express = require("express");
const route = express.Router();
const quotation  = require('../controller/quotation');




/**
 * @description: add quotation
 * @method: POST / add_quotation 
 */
route.post('/add_quotation',quotation.add_quotation)

/**
 * @description: quotation pdf
 * @method: GET / generate_quotation_pdf 
 */
route.get('/generate_quotation_pdf/:id',quotation.quotation_pdf)

/**
 * @description: quotation list
 * @method: GET / generate_quotation_pdf 
 */
route.get('/get_quotation_list',quotation.get_quotation_list)










module.exports = route;