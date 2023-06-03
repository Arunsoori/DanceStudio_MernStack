const courseModel = require("../model/courseModel");
const mongoose = require('mongoose');
const session = require("express-session");







const addCourse = async (req, res, next) => {

    try{
    const imagePath = req.files.image[0].path;
    const modifiedImagePath = imagePath.replace(/^public[\\/]+/, "");
    console.log(req.body.faculty,"faculty");
  
    const course = new courseModel({
      coursename: req.body.coursename,
      skill: req.body.skill,
      description: req.body.description,
      facultyId: req.body.faculty,
      onemonthprice: req.body.onemonthprice,
      sixmonthprice: req.body.sixmonthprice,
      oneyearprice: req.body.oneyearprice,
      image_url: modifiedImagePath,
    });
    console.log(course);
    course.save();
    res.json({ status:true, message: "course added successfully"})
    } catch(error){
        res.json({status:false, message:error.message})


    }
  };
  const listCourse = async (req, res, next) => {
    try {
      
      const coursedata = await courseModel.find({});
  
      if (coursedata) {
       
        res.json({ status: true, coursedata });
      } else {
        res.json({ status: false, message: "no courses" });
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

if(singleCourseDetails){
  res.json({status:true, Singledetails})
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
        console.log("hi");
      
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

  





  module.exports={
    listCourse,
    addCourse,
    deleteCourse,
    singleCourseDetails,
    editCoursedata,
    updateCourseData,
    FetchPackageAmount,
    packagePrice


  }