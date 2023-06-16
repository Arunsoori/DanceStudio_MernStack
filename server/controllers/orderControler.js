const orderModel = require("../model/orderModel");
const mongoose = require('mongoose');

const orderDetails = async(req,res,next)=>{
    console.log("in order controller");
    try{
        const page = parseInt(req.query.page)||1;
        console.log(page,"page");
        const limit = 2; // Number of courses per page
    
        const totalCourses = await orderModel.countDocuments({});
        const totalPages = Math.ceil(totalCourses / limit);
    
     const order =  await orderModel.find({}).populate('userId').populate('courseId').skip((page - 1) * limit)
     .limit(limit);
     if(order.length>0){
        res.json({status:true, order, totalPages})
     }else{
        res.json({status:false, message:"no orders found"})
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
 const orderData = async(req,res,next)=>{
    try{
      const  orderdata= await orderModel.find({})
      res.json({status:true, orderdata})

    }catch{
        res.json({status:false, message:"no order"})

    }
 }


module.exports={
    orderDetails,
    orderCancel,
    orderData
}