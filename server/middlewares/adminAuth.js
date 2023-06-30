const jwt = require('jsonwebtoken')
const adminModel= require('../model/adminModel')
 module.exports= async (req,res,next)=>{
   console.log("admin auth in");
    try{
        const authHeader=req.headers.authorization
        console.log(authHeader,"auth header");
        const authToken = authHeader.replace(/^Bearer\s+/i,'')
        console.log(authToken,"authtoken");
   // if there is no tocken
   if(!authToken) return res.json({ loginfail: true, status: false, message: "no auth token" });

   //decording the token
   const decoded = jwt.verify(authToken,process.env.JWT_SECRETE_KEY)
   //checking whether the admin is exist or not
   const admin = await adminModel.findOne({_id:decoded.id})
   console.log(admin,"admin details in auth");
   if(!admin) return res.json({loginfail:true,status:false,message:"Unauthorized"})
   req.admin = admin
   next()
} catch (error) { 
   return res.json({loginfail:true,status:false,message:"Unauthorized"})
}
}