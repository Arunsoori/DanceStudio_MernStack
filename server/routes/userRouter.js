const { singleCourseDetails, FetchPackageAmount, packagePrice, coursePayment, verifyPayment } = require("../controllers/courseController")
const {  FetchFacultydetails } = require("../controllers/facultyController")
const { doSignup, getOtp, verifyOtp, Home,doLogin, userPasswordChange, profilePicture, userDetails, } = require("../controllers/userController")
const userAuth = require("../middlewares/userAuth")

const router= require("express").Router()
const {uploadImage} = require ("../utils/multer.js")



router.post("/signup", doSignup , getOtp )
router.post("/login", doLogin )

router.post("/verifyotp", verifyOtp  )
router.get("/", userAuth,Home )
router.get("/singlepage/:id", singleCourseDetails) 
router.get("/facultydetails/:id", FetchFacultydetails)
router.get("/packageamount/:option/:id" ,FetchPackageAmount)
router.get("/packageprice", packagePrice)
router.get("/buy-course", coursePayment)
router.post("/verifypayment",userAuth,verifyPayment)
router.post("/profilepicture",userAuth,uploadImage('./public/images/faculty'),profilePicture)
router.post("/passwordchange",userAuth, userPasswordChange)
router.post("/profilepicture",userAuth,uploadImage('./public/images/faculty'),profilePicture)
router.post("/userdetails",userAuth,userDetails)





module.exports= router