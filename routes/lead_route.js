const express = require("express");
const route  =express.Router();
const Lead = require('../controller/lead');


/**
 * @description: add lead
 * @method: POST / add_lead 
 */
route.post('/add_lead',Lead.add_lead)

/**
 * @description: get all leads
 * @method: GET /get_all_leads
 */
route.get('/get_all_leads/:page',Lead.get_all_leads)

/**
 * @description: get lead Product
 * @method: GET /get_lead_products
 */
route.get('/get_lead_products/:id',Lead.get_lead_products)







module.exports = route;