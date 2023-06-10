const { singleCourseDetails, FetchPackageAmount, packagePrice, coursePayment, verifyPayment } = require("../controllers/courseController")
const {  FetchFacultydetails } = require("../controllers/facultyController")
const { doSignup, getOtp, verifyOtp, Home,doLogin, } = require("../controllers/userController")
const userAuth = require("../middlewares/userAuth")

const router= require("express").Router()


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





module.exports= router