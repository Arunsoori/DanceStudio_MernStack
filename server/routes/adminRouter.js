const {adminLogin,dashboard, listUsers, } = require("../controllers/adminController")
const { addFaculty, listFaculty} = require("../controllers/facultyController")
const {addCourse,listCourse, deleteCourse, editCoursedata, updateCourseData} = require ("../controllers/courseController")
const {orderDetails, orderCancel} = require("../controllers/orderControler")
// import{Auth}  from '../middlewares/userAuth'

const router= require("express").Router()
const {uploadImage} = require ("../utils/multer.js")


router.post("/login",adminLogin)
router.post("/dashboard",dashboard)
router.post("/addcourse",uploadImage('./public/images/course'),addCourse)
router.post("/addfaculty",uploadImage('./public/images/faculty'),addFaculty)
router.get("/listUsers",listUsers)
router.get("/listFaculty", listFaculty)
router.get("/listCourse", listCourse)
router.get("/deletecourse/:id", deleteCourse )
router.get("/editcourse/:id", editCoursedata )
router.post("/updatecourse/:id",uploadImage('./public/images/faculty'), updateCourseData )
router.post("/order", orderDetails)
router.post("/ordercancel/:id", orderCancel)








module.exports= router