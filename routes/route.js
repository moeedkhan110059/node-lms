const express = require("express");
const route = express.Router();
const category = require("../controller/category");
const product = require("../controller/product");
// API

/**
 * @description: add category
 * @method: POST / add_category
 */
route.post('/add_category',category.addCategory)

/**
 * @description: get categories
 * @method: GET / category_list
 */

route.get('/category_list/:page',category.getCategories);

/**
 * @description: get All categories
 * @method: GET / get_all_catogory
 */

route.get('/get_all_catogory',category.getAllCategories);


/**
 * @description: single categories
 * @method: GET / category_list
 */
route.get('/single_category/:id',category.getSingleCategory);

/**
 * @description: delete category
 * @method: DELETE / delete_category
 */
route.delete('/delete_category/:id',category.deleteCategory);

/**
 * @description: update category
 * @method: PUT / update_category
 */
route.put('/update_category/:id',category.updateCategory);


/**
 * @description: add Product
 * @method: POST / add_product
 */
route.post('/add_product',product.addProduct)

/**
 * @description: get products
 * @method: GET / product_list
 */

route.get('/product_list/:page',product.getProducts);


/**
 * @description: single product
 * @method: GET / single_product
 */
route.get('/single_product/:id',product.getSingleProduct);

/**
 * @description: delete product
 * @method: DELETE / delete_product
 */
route.delete('/delete_product/:id',product.deleteProduct);

/**
 * @description: update category
 * @method: PUT / update_category
 */
route.put('/update_product/:id',product.updateProduct);





module.exports = route;