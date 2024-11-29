const productModel = require('../models/productModel');
const{ isLoggedIn }= require('../middlewares/isLoggedIn')
module.exports.getProduct = isLoggedIn, async (req,res,next)=>{
    try{
const product = await productModel.find();

res.status(201).json({message:"here is the given product",product})

    }catch(err){
   next(err);
    }
}
module.exports.getProductById = isLoggedIn, async (req,res,next)=>{
    try{
const product = await productModel.findOne({_id:req.params.productid});
res.status(201).json({message:"here is the given product",product})

    }catch(err){
     next(err);
    }
}