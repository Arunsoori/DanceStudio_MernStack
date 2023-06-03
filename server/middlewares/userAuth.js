const jwt = require('jsonwebtoken')
const userModel= require('../model/userModel')
 module.exports= async (req,res,next)=>{
   console.log("userauthg in");
    try{
        const authHeader=req.headers.authorization
        console.log(authHeader,"auth header");
        const authToken = authHeader.replace(/^Bearer\s+/i,'')
        console.log(authToken,"authtoken");
   // if there is no tocken
   if(!authToken) return res.json({ loginfail: true, status: false, message: "no auth token" });

   //decording the token
   const decoded = jwt.verify(authToken,process.env.JWT_SECRETE_KEY)
   //checking whether the user is exist or not
   const user = await userModel.findOne({_id:decoded.id})
   console.log(user,"userdetails in auth");
   if(!user) return res.json({loginfail:true,status:false,message:"Unauthorized"})
   req.user = user
   next()
} catch (error) { 
   return res.json({loginfail:true,status:false,message:"Unauthorized"})
}
}