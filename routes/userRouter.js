const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const {getProduct,getProductById} = require('../controller/getProduct')



router.post('/signup',authController.register);
router.post('/login',authController.login);
router.post('/logout',authController.logout);
router.get('/profile',authController.profile);

router.get('/products',getProduct)
router.get('/product/:productid',getProductById)
router.get('/order/:orderId',authController.createOrder);
router.get('/verify/:id',authController.verifyPayment)
module.exports = router;

