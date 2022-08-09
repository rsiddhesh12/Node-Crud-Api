const express = require('express');
const router = express.Router()

const userController = require('../controllers/userController.js');
const productController = require('../controllers/productController.js');
const LogDataController = require('../controllers/logController.js');
const orderController = require('../controllers/orderController.js');


router.get('/allUser', userController.getAllUsers);

router.get('/limitedUser/:limit/:offset', userController.getlimitedUsers);

router.post('/addUser', userController.addUser);

router.get('/:id', userController.getOneUser);

router.post('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.get('/order/:id', userController.getOneUserOrder);


router.get('/product/allProduct', productController.getAllProducts);

router.get('/product/limitedProduct/:limit/:offset', productController.getlimitedProducts);

router.post('/product/addProduct', productController.addProduct);

router.get('/product/:id', productController.getOneProduct);

router.post('/product/:id', productController.updateProduct);

router.delete('/product/:id', productController.deleteProduct);


router.post('/logdata/createlLog', LogDataController.createLog);

router.get('/logdata/getLog', LogDataController.getLog);

router.get('/logdata/getLogFileDownload/:name', LogDataController.getCsvDownload);


router.post('/order/createOrder', orderController.createOrder);

router.get('/order/getOrder', orderController.getOrderData);

module.exports = router