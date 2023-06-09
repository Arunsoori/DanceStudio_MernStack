const userModel = require("../model/userModel");
const sendOtp = require("../utils/mailer");
const jwt = require("jsonwebtoken");

const session = require("express-session");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;

// let otp = "";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: maxAge,
  });
};

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  if (err.message === "Incorrect Email") {
    errors.email = "Email is not registerd";
  }
  if (err.message === "Incorrect password") {
    errors.password = "Incorrect Password";
  }

  // if (err.code === 11000) {
  //   errors.email = "Email is already registered"
  //   return errors;
  // }

  // if (err.message.includes("Users validation failed")) {
  //   Object.values(err.errors).forEach(({ properties }) => {
  //     errors[properties.path] = properties.message
  //   })
  // }
  return errors;
};

const doSignup = async (req, res, next) => {
  try {
    const { firstName, email, password } = req.body;
    req.session.email = req.body.email;

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.json({ error: "email already in use" });
    } else {
      req.session.firstName = req.body.firstName;
      req.session.password = req.body.password;
      next();
    }
  } catch (err) {
    res.json({ created: false });
  }
};

const getOtp = async (req, res, next) => {
  let email = req.session.email;
  console.log(req.session);
  let otp = Math.floor(100000 + Math.random() * 900000);
  req.session.otp = otp;
  // console.log(req.session.otp,"generate");
  await sendOtp
    .sendVerifyEmail(email, otp)
    .then(() => {
      res.json({ status: true });
    })
    .catch((error) => {
      next(error);
    });
};
const verifyOtp = async (req, res, next) => {
  try {
    // console.log(req.body.otp,"body.otp");
    // console.log(req.session.otp,"sessio otp");

    // console.log(req.session.user);

    if (req.body.otp == req.session.otp) {
      const userData = new userModel({
        firstName: req.session.firstName,
        email: req.session.email,
        password: req.session.password,
      });
      const userdetails = await userData.save();
      //  console.log(userdetails._id,"userId");
      //  const tokenF= userdetails._id.toString()

      const token = createToken(userdetails._id);
      res
        .json({ created: true, message: "verification successfull", token })

        .catch(() => {
          console.log(error);
        });
    } else {
      res.json({ error: "invalid OTP" });
    }
  } catch {}
};

const Home = async (req, res, next) => {
  console.log("home in");
  const userDetails = req.user;
  res.json({ status: true, user: userDetails });
};

const doLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    req.session.email = req.body.email;

    // console.log(req.body,"body");
    const user = await userModel.findOne({ email });
    // console.log(user,"user");
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);
        res.json({ user: user, created: true, token });
      } else {
        throw Error("password incorrect");
      }
    } else {
      throw Error("incorrect email");
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};

const userPasswordChange = async (req, res, next) => {
  console.log("userpassword change in");
  try {
    const { currentpassword, newpassword, confirmpassword } = req.body;
    const saltRounds = 10; // Number of salt rounds for bcrypt hashing

    console.log(req.body, "boooooody");

    const user = await userModel.findById({ _id: req.user._id });
    console.log(user, "user");
    const currentPasswordIsValid = await bcrypt.compare(
      currentpassword,
      user.password
    );
    console.log(currentPasswordIsValid, "valid");

    if (!currentPasswordIsValid) {
      return res.json({
        status: false,
        message: "current password is not matching",
      });
    }
    const newPassword = await bcrypt.hash(newpassword, saltRounds);
    await userModel.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: { password: newPassword } }
    );

    res.json({ status: true, message: "password changed successfully" });
  } catch (error) {
    res.json({ status: false });
  }
};

const userDetailsChange= async(req,res,next)=>{
  const { firstName , email} = req.body
  console.log(req.body ,"body");

  try{
    console.log(req.user._id,"id");
  
    await userModel.findOneAndUpdate({_id:req.user._id}, {$set:{
      firstName:req.body.firstName,
      email:req.body.email

    }})
    res.json({status:true})

  }catch(error){
    res.json({status:false})

  }

}
const profilePicture = async (req, res, next) => {
  console.log("in  controller");
  try {
    console.log(req.user._id, "req.user;id");
    const imagePath = req.files.image[0].path;
    console.log(imagePath, "imagepath");
  const modifiedImagePath = imagePath.replace(/^public[\\/]+/, "");

    console.log(modifiedImagePath, "modified");
    await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { image_url: modifiedImagePath } }
    )
    res.json({ image_url: modifiedImagePath });
  } catch (error) {
    console.log(error);
  }
};
const userDetails = async (req, res, next) => {
  try{
    const user = await userModel
    .findById({ _id: req.user._id })
    .populate("enrolledCouseId");
  //  console.log(req.user,"req.user");
  if(user){
    res.json({ status:true, user });

  }else{
    res.json({status:false,user: null})

  }

  }catch(error){
    next(error)
  }

};

module.exports = {
  getOtp,
  doSignup,
  doLogin,

  verifyOtp,
  Home,
  userPasswordChange,
  userDetailsChange,
  profilePicture,
  userDetails,
};
