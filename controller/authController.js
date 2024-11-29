const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {generateToken} = require('../utills/gnerateToken');
const paymentModel = require("../models/paymentModel")
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel")
const Razorpay = require('razorpay');

var instance = new Razorpay({
  key_id: process.env.Razorpay_KEY_ID,
  key_secret: process.env.Razorpay_KEY_SECRET,
});

module.exports.login = async (req, res) => {
   try{ 
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message: 'Email and password are required'});
    }
    const user = await User.findOne({email});
    if(!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const token = generateToken(user);
    res.status(200).json({token});
}catch(error){
    res.status(500).json({message: error.message});
}
}

module.exports.register = async(req,res) =>{
  try{  
    const {name, email ,password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }
    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(400).json({message: 'user is alerady registered'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name, email, password: hashedPassword
    });
    const token = generateToken(user);
    res.status(201).json({token});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
module.exports.logout = async(req,res) =>{
 try{  
     const token = req.headers.authorization.split(' ')[1];
    if(!token) {
        return res.status(400).json({message: 'Token is required'});
    }

    const isBlackListed = await BlackList.findOne({token});

    if(isBlackListed) {
        return res.status(400).json({message: 'Token is already blacklisted'});
    }
 
    await BlackList.create({token});
    res.status(200).json({message: 'Logout successful'});
}catch(error){
    res.status(500).json({message: error.message});
}
}


module.exports.profile = async(req,res) =>{
    res.status(200).json({message: 'Profile fetched successfully'});
}

module.exports.createOrder = async(req,res,next) =>{
  try { 
    const product = await productModel.findById(req.params.orderId);
    const options = {
        amount: product.amount * 100,
        currency: "INR",
    }
    const order = await instance.orders.create(options);
    res.status(200).json({order});
   
    const payment = await paymentModel.create({
        order:order.id,
        amount:product.amount,
        currency:'INR',
        status:'pending'
    })
}catch(err){
    next(err);
}
}
module.exports.verifyPayment = async(req,res,next)=>{
    try{
     const{paymentId,orderId,signature} = req.body;
     const secret = process.env.Razorpay_KEY_SECRET;
    const{validatePaymentVerification} = require('../node_modules/razorpay/dist/utils/razorpay-utils')

    const isvalid = validatePaymentVerification({   //it gives only true or false
        order_id:orderId,
        payment_id:paymentId,
    },signature,secret)


    if(isvalid){
        const payment = await paymentModel.findOne({orderId:orderId })
        payment.paymentId = paymentId;
        payment.status = 'success';
        payment.signature = signature;

        await payment.save();
        res.status(200).json({
            message:"payment verification succssful"
        })
    }else{
        const payment = await paymentModel.findOne({orderId});
        payment.status = 'failed';
        await payment.save();
        res.status(400).json({message:'payment vrification failed'})
    }

    }catch(err){
        next(err);
    }
}