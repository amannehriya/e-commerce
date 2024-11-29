const userModel = require("../models/userModel");
const blacklistModel = require("../models/blacklist");
const jwt = require('jsonwebtoken');
module.exports.isLoggedIn = async(req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
      
        const blacklistedToken = await blacklistModel.findOne({token});
        if(blacklistedToken){
            return res.status(401).json({message: 'unauthorized'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({message: '17'});
    }
}
module.exports.isSeller = async(req,res,next) =>{
 try {
      const user = req.user;
    if(user.role !== 'seller'){
        return res.status(401).json({message: 'unauthorized'});
    }
    next();
}catch(error){
    next(error);
}
}
