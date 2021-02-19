const express = require("express");
const route  =express.Router();
const Lead = require('../controller/lead');


/**
 * @description: add lead
 * @method: POST / add_lead 
 */
route.post('/add_lead',Lead.add_lead)







module.exports = route;