const orderModel = require("../model/orderModel");
const mongoose = require('mongoose');

const orderDetails = async(req,res,next)=>{
    try{
     const order =  await orderModel.find({}).populate('userId').populate('courseId')
     if(order){
        res.json({status:true, order})
     }

    }catch(error){
        console.error(error)
   res.json({status:false})
    }
}

const orderCancel = async(req,res,next)=>{
    console.log(req.params.id);
    try{
        await orderModel.findByIdAndUpdate({_id:req.params.id},{$set:{
           status:false

        }})
        const order= await orderModel.find({}).populate('userId').populate('courseId')
           res.json({ status:true,order})

    }
    catch(error){
        res.json({status:false,order})

    }

}
module.exports={
    orderDetails,
    orderCancel
}