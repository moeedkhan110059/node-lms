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
 * @method: GET / get_quotation_list 
 */
route.get('/get_quotation_list',quotation.get_quotation_list)

/**
 * @description: add quotation product
 * @method: POST / add_quotation_product 
 */
route.post('/add_quotation_product',quotation.add_quotation_product)

/**
 * @description: delete quotation product
 * @method: GET / delete_quotation_product 
 */
route.get('/delete_quotation_product/:id',quotation.delete_quotation_product)

/**
 * @description:  quotation detail
 * @method: GET / quotation_detail 
 */
route.get('/quotation_detail/:id',quotation.quotation_detail)

/**
 * @description:  quotation product update
 * @method: GET / update_quotation_product 
 */
route.put('/update_quotation_product/:id',quotation.update_quotation_product)










module.exports = route;