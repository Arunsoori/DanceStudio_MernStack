const courseModel = require("../model/courseModel");
const userModel = require("../model/userModel")
const orderModel =require("../model/orderModel")
const mongoose = require('mongoose');
const session = require("express-session");
const Razorpay = require("razorpay")
const crypto = require("crypto")
const sendConfirmation = require("../utils/mailer")


const key_id = process.env.RAZORPAY_KEYID
const key_secret = process.env.RAZORPAY_SECRET





const addCourse = async (req, res, next) => {

    try{
    const imagePath = req.files.image[0].path;
    const modifiedImagePath = imagePath.replace(/^public[\\/]+/, "");
    console.log(modifiedImagePath,"modifieffsddsdddsd");
    // console.log(req.body.faculty,"faculty");
  
    const course = new courseModel({
      coursename: req.body.coursename,
      skill: req.body.skill,
      description: req.body.description,
      facultyId: req.body.faculty,
      onemonthprice: req.body.onemonthprice,
      sixmonthprice: req.body.sixmonthprice,
      oneyearprice: req.body.oneyearprice,
      groupId: req.body.group,
      image_url: modifiedImagePath,
    });
    // console.log(course);
    course.save();
    res.json({ status:true, message: "course added successfully"})
    } catch(error){
        res.json({status:false, message:error.message})


    }
  };

const userListCourse= async(req,res)=>{
  try{
    coursedata = await courseModel.find({})
    res.json({status:true, coursedata})

  }catch{
    res.json({status:false, message: "no courses"})


  }
}


  const listCourse = async (req, res, next) => {
  
    try {
      const page = parseInt(req.query.page) || 1;
      console.log(page,"page");
      const limit = 2; // Number of courses per page
  
      const totalCourses = await courseModel.countDocuments({});
      const totalPages = Math.ceil(totalCourses / limit);
  
      const courses = await courseModel
        .find({})
        .skip((page - 1) * limit)
        .limit(limit);
  
      if (courses.length > 0) {
        res.json({ status: true, coursedata: courses, totalPages });
      } else {
        res.json({ status: false, message: "No courses found." });
      }
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  };
  


  const deleteCourse= async(req,res,next)=>{
       try{
        
     const id = req.params.id
     await courseModel.deleteOne({_id:id})
     const coursedata = await courseModel.find({})
     res.json({status:true,  coursedata})
          

        
       }catch(error){
   res.json({status:true, message:error.message})
       }
  }


  const singleCourseDetails = async(req,res,next)=>{


    try{
  let Singledetails=await courseModel.findOne({_id:req.params.id}).populate("facultyId")
 const price = req.session.packageprice
if(singleCourseDetails){
  res.json({status:true, Singledetails,price})
}else{
  res.json({status:false,message: "no course details"})
}

    }catch(error){
      res.json({status:false, message:error.message})
    }
  }

  const editCoursedata= async(req,res,next)=>{
    console.log("in edit course data controller");
    const id = req.params.id
    console.log(id);
    try{
      const singleCourseData = await courseModel.findOne({_id:id})
   
    if(singleCourseData){
      res.json({status:true, singleCourseData})
    }else{
      res.json({status:false, })
    }
    

    }catch(error){
      res.json({status:false})

    }
  }

  const updateCourseData = async (req, res, next) => {

    const id = req.params.id;


    console.log(req.files, " body");
    try {
       if(req.files.image){
      
      
        const imagePath = req.files.image[0].path;
    const modifiedImagePath = imagePath.replace(/^public[\\/]+/, "");
        
        await courseModel.findOneAndUpdate({_id:id}, {$set:{
           image_url: modifiedImagePath
        }})
       }
  
      
  
       await courseModel.findOneAndUpdate({_id: id}, {$set:{
         coursename: req.body.coursename,
         skill: req.body.skill,
         description : req.body.description,
         faculty: req.body.faculty,
         onemonthprice :req.body.onemonthprice,
         sixmonthprice: req.body.sixmonthprice,
        
       }})
       res.json({status:true, message:"updated successfully"})
  
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error.message });
    }
  };

  const FetchPackageAmount = async(req,res,next)=>{
    const id = req.params.id
    console.log(req.params.option);
     try{
      const dataforpurchase=   await  courseModel.findOne({_id:id})
      if(req.params.option=='one'){

        const package= dataforpurchase.onemonthprice
        req.session.packageprice = package

      }else if(req.params.option=='six'){
        const package= dataforpurchase.sixmonthprice
        req.session.packageprice = package

      }else if(req.params.option=='year'){
              const package= dataforpurchase.oneyearprice
              req.session.packageprice = package
      }
      console.log(req.session.packageprice, "sesssiooooooooon");
      res.json({status:true})
     }catch(error){
  console.log(error);
     }
  }

  const packagePrice = (req,res,next)=>{

    try{
      const price = req.session.packageprice
      console.log(price,"price");
      
      res.json({ status:true, price })
    }catch(error){
 next(error)
    }
       
   

  }

  const coursePayment = async(req,res,next)=>{

    const price = req.session.packageprice
    console.log(price, "pricce");
    try{
      const instance = new Razorpay({
        key_id,
        key_secret
      })

       const options = {
      amount: price * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString('hex')
    }
    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ message: 'Something gone wrong' })
      }
      // res.status(200).json({ data: order })
      res.json({status:true, order})
    })





    }catch(error){
      next(error)
    }
  }

  
const  verifyPayment= async(req,res,next)=>{
  console.log("in verify payment controller");
  console.log(req.session.email,"email");
  try{
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      course
      
    } = req.body

  
console.log(req.user._id," user");

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", key_secret)
      .update(sign.toString())
      .digest('hex');


    if (razorpay_signature === expectedSign) {
      console.log("payment successfull");
      await userModel.findOneAndUpdate({email:req.session.email},{$push:{ 
        enrolledCouseId: req.body.course._id
      }})



 const order = new orderModel({
  userId: req.user._id,
courseId : req.body.course._id,
orderdate : new Date(),
status: true

 })
 await  order.save()
       console.log(req.session.email,req.body.course.coursename ,"want");

 sendConfirmation.sendPaymentConfirmationEmail(req.session.email,req.body.course.coursename);
      res.json({status:true, message:"payment verified successfully"})
    }
    console.log("not");
    res.json({status:false})
  }catch(error){
   
    console.log("in catch");
    next(error)
  }
}





  module.exports={
    listCourse,
    addCourse,
    deleteCourse,
    singleCourseDetails,
    editCoursedata,
    updateCourseData,
    FetchPackageAmount,
    packagePrice,
    coursePayment,
    verifyPayment,
    userListCourse
    



  }