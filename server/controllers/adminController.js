const adminModel = require("../model/adminModel");

const userModel = require("../model/userModel");
const facultyModel = require("../model/facultyModel");
const orderModel = require('../model/orderModel')
const courseModel = require ('../model/courseModel')

// const facultyModel = require ('../model/facultyModel')

const jwt = require("jsonwebtoken");

const session = require("express-session");

const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: maxAge,
  });
};

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, "body");
    const admin = await adminModel.findOne({ email });
    console.log(admin, "admin");
    if (admin) {
      const auth = await bcrypt.compare(password, admin.password);
      console.log(auth);
      if (auth) {
        const token = createToken(admin._id);
        console.log(token, "adminjwt");
        res.json({
          status: true,
          message: "verification successfull",
          created: true,
          token,
        });
      } else {
        res.json({ status: false, message: "incorrect password" });
      }
    } else {
      res.json({ status: false, message: "incorrect email" });
    }
  } catch (error) {}
};
const dashboard = async (req, res, next) => {

  try{
    res.json({status:true})

  }catch{

  }
  // if (req.admin) {
  //   res.json({ status: true });
  // }else{
  //   res.json({status:false})
  // }
};

const addCourse = async (req, res, next) => {
  const imagePath = req.files.image[0].path;
  const modifiedImagePath = imagePath.replace(/^public[\\/]+/, "");

  const course = new courseModel({
    coursename: req.body.coursename,
    skill: req.body.skill,
    description: req.body.description,
    faculty: req.body.faculty,
    onemonthprice: req.body.onemonthprice,
    sixmonthprice: req.body.sixmonthprice,
    oneyearprice: req.body.oneyearprice,
    image_url: modifiedImagePath,
  });
  console.log(course);
  course.save();
};

const listUsers = async (req, res, next) => {

  try {
    const users = await userModel.find({});
  
    if (users) {
      res.json({ status: true, users });
    } else {
      req.json({ status: false, message: "user not found" });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};


const listCourse = async (req, res, next) => {
  try {
    console.log("called course list");
    const coursedata = await courseModel.find({});

    if (coursedata) {
      console.log(coursedata, "coursedata");
      res.json({ status: true, coursedata });
    } else {
      res.json({ status: false, message: "no courses" });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
const Findcount = async(req,res, next)=>{
  try{

    const userCount = await userModel.countDocuments({})
    const facultyCount = await facultyModel.countDocuments({});
    const courseCount = await courseModel.countDocuments({});
    const orderCount = await orderModel.countDocuments({});

res.json({userCount,facultyCount,courseCount,orderCount})


  }catch(error){
    next(error)

  }
}
const blockUser = async (req, res, next) => {
  console.log("admin cintroller block");
  try {
      const userId = req.params.id
      const user = await userModel.findOne({ _id: userId })
      if (!user) {
          res.json({ status: false, message: "User Not Found" })
      } else {
          user.blockStatus = !user.blockStatus
          await user.save()
          res.json({ status: true, message: "User block status updated", user })
      }

  } catch (error) {
      console.log(error);
  }
}


module.exports = {
  adminLogin,
  addCourse,
  dashboard,
  
  listUsers,
  
  listCourse,
  Findcount,
  blockUser
};
