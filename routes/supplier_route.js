const express  = require("express");
const route = express.Router();
const Supplier  = require('../controller/supplier');


/**
 * @description: add new Supplier
 * @method: POST /add_Supplier
 */
route.post('/add_supplier',Supplier.add_supplier)

/**
 * @description: get Supplier
 * @method: GET /get_Supplier
 */
route.get('/get_supplier/:id',Supplier.get_supplier)


/**
 * @description: get Supplier list
 * @method: GET /get_Supplier_list
 */
route.get('/get_supplier_list/:page',Supplier.get_supplier_list)


/**
 * @description: update Supplier
 * @method: PUT /get_Supplier_list
 */
route.put('/update_supplier/:id',Supplier.update_supplier)







module.exports = route;