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
     console.log(order,"oorder");

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
        res.json({status:false})

    }

}
//  const orderData = async(req,res,next)=>{
//     try{
//       const  orderdata= await orderModel.find({}).populate('courseId')
//       res.json({status:true, orderdata})

//     }catch{
//         res.json({status:false, message:"no order"})

//     }
//  }
const orderData = async (req, res, next) => {
    try {
      const orderdata = await orderModel.find({}).populate('courseId')
      console.log(orderdata,"ooooooo");
  
      // Calculate the total number of orders
      const totalOrders = orderData.length;
  
      // Calculate the count of each course
      const courseCounts = {};
      orderdata.forEach((order) => {
        const courseId = order.courseId?._id;
        if (courseId) {
          if (courseCounts[courseId]) {
            courseCounts[courseId]++;
          } else {
            courseCounts[courseId] = 1;
          }
        }
      });
  
      // Calculate the percentage for each course
      const coursePercentage = Object.keys(courseCounts).map((courseId) => ({
        courseId,
        percentage: (courseCounts[courseId] / totalOrders) * 100,
      }));
  
      res.json({ status: true,orderdata, coursepercentage: coursePercentage });
    } catch (error) {
      res.json({ status: false, message: "No order" });
    }
  };
  const activeOrders= async(req,res,next)=>{
    console.log(req.user,"___id");
    try{
      const courses = await orderModel.find({userId:req.user._id, status:true}).populate("courseId")
  
    res.json({status:true, courses})
  }

    catch(error){
      res.json({status:false})
      next(error)

    }
  }
  


module.exports={
    orderDetails,
    orderCancel,
    orderData,
    activeOrders
}