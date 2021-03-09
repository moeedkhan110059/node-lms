const express  = require("express");
const route = express.Router();
const User  = require('../controller/user');

/**
 * @description: add new user
 * @method: POST /add_customer
 */

//route.post('/login',User.login);

/**
 * @description: add new user
 * @method: POST /add_customer
 */
route.post('/add_user',User.add_user)

/**
 * @description: get user
 * @method: GET /get_user
 */
route.get('/get_user/:id',User.get_user);


/**
 * @description: get user list
 * @method: GET /get_user_list
 */
route.get('/get_user_list/:page',User.get_user_list)


/**
 * @description: update user
 * @method: PUT /update_user
 */
route.put('/update_user/:id',User.update_user)







module.exports = route;