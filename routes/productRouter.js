const express = require('express');
const router = express.Router();
const upload = require('../config/multer-setup');
const {isLoggedIn,isSeller} = require('../middlewares/isLoggedIn');

const productModel = require('../models/productModel');
router.use(isLoggedIn).use(isSeller);
router.post('/create',upload.single('image'),async(req,res)=>{
    const {name,price,description} = req.body;
    if(!name || !price || !description){
        return res.status(400).json({message: "All fields are required"});
    }
    const product = await productModel.create({name,price,description,image:req.file.buffer,seller:req.user._id});

    return res.status(201).json({message: "Product created successfully",product})

})

module.exports = router;