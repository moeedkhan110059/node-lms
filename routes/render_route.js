const express = require("express");
const router = express.Router();
const renderService  = require("../services/render");


router.get('/',renderService.home)








module.exports = router;