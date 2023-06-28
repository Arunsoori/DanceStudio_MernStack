const {adminLogin,dashboard, listUsers, Findcount, } = require("../controllers/adminController")
const { addFaculty, listFaculty, FetchFacultydetails, updateFacultyData, deleteFaculty} = require("../controllers/facultyController")
const {addCourse,listCourse, deleteCourse, editCoursedata, updateCourseData} = require ("../controllers/courseController")
const {orderDetails, orderCancel, orderData} = require("../controllers/orderControler")
const {adminAddGroup, adminListGroup, Groupdata} = require("../controllers/groupController")
const { AddEvent } = require("../controllers/eventController")


// import{Auth}  from '../middlewares/userAuth'

const router= require("express").Router()
const {uploadImage} = require ("../utils/multer.js")



router.post("/login",adminLogin)
router.post("/dashboard",dashboard)
router.post("/addcourse",uploadImage('./public/images/course'),addCourse)
router.post("/addfaculty",uploadImage('./public/images/faculty'),addFaculty)
router.post("/updatefaculty/:id",uploadImage('./public/images/faculty'),updateFacultyData)
router.get("/listUsers",listUsers)
router.get("/listFaculty", listFaculty)
router.get("/editfaculty/:id", FetchFacultydetails)
router.get("/listCourse", listCourse)
router.delete("/deletecourse/:id", deleteCourse )
router.delete("/deletefaculty/:id",deleteFaculty)
router.get("/editcourse/:id", editCoursedata )
router.post("/updatecourse/:id",uploadImage('./public/images/faculty'), updateCourseData )
router.post("/order", orderDetails)
router.post("/ordercancel/:id", orderCancel)
router.post("/orderdata", orderData)
router.post("/addgroup",adminAddGroup)
router.get("/listGroup",adminListGroup)
router.get("/groupdata", Groupdata)
router.get("/count", Findcount)
router.post("/event",uploadImage('./public/images/faculty'), AddEvent)









module.exports= router