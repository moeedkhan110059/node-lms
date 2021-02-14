const express  = require("express");
const route = express.Router();
const Customer  = require('../controller/customer');


/**
 * @description: add new customer
 * @method: POST /add_customer
 */
route.post('/add_customer',Customer.add_customer)

/**
 * @description: get customer
 * @method: GET /get_customer
 */
route.get('/get_customer/:id',Customer.get_customer)


/**
 * @description: get customer list
 * @method: GET /get_customer_list
 */
route.get('/get_customer_list/:page',Customer.get_customer_list)


/**
 * @description: update customer
 * @method: PUT /get_customer_list
 */
route.put('/update_customer/:id',Customer.update_customer)







module.exports = route;