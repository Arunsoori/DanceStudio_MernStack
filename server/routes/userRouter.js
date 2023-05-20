const { doSignup} = require("../controllers/userController")

const router= require("express").Router()


router.post("/signup",doSignup , getOtp )


module.exports= router