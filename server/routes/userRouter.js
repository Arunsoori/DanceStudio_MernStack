const { singleCourseDetails, FetchPackageAmount, packagePrice, coursePayment, verifyPayment, userListCourse } = require("../controllers/courseController")
const { EventFetch } = require("../controllers/eventController")
const {  FetchFacultydetails } = require("../controllers/facultyController")
const { addMessage, messageDetails } = require("../controllers/messageController")
const { doSignup, getOtp, verifyOtp, Home,doLogin, userPasswordChange, profilePicture, userDetails, userDetailsChange, } = require("../controllers/userController")
const userAuth = require("../middlewares/userAuth")

const router= require("express").Router()
const {uploadImage} = require ("../utils/multer.js")



router.post("/signup", doSignup , getOtp )
router.post("/login", doLogin )

router.post("/verifyotp", verifyOtp  )
router.get("/", userAuth,Home )
router.get("/singlepage/:id", singleCourseDetails) 
router.get("/facultydetails/:id", FetchFacultydetails)
router.get("/packageamount/:option/:id" ,userAuth,FetchPackageAmount)
router.get("/packageprice", packagePrice)
router.get("/buy-course", coursePayment)
router.post("/verifypayment",userAuth,verifyPayment)
router.post("/profilepicture",userAuth,uploadImage('./public/images/faculty'),profilePicture)
router.post("/passwordchange",userAuth, userPasswordChange)
router.post("/editdetails",userAuth, userDetailsChange)
router.post("/profilepicture",userAuth,uploadImage('./public/images/faculty'),profilePicture)
router.post("/userdetails",userAuth,userDetails)
router.get("/coursedata",userListCourse)

router.post('/send-message', userAuth, addMessage);
router.post("/messagedetails", messageDetails)
router.post("/eventfetch", EventFetch)





module.exports= router