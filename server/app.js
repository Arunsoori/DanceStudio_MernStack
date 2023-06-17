// --importing modules---
require("dotenv").config()

const express = require("express")
const app =express()
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const adminRouter=require("./routes/adminRouter")
const userRouter=require("./routes/userRouter")
const session=require("express-session")
const cookieParser = require('cookie-parser')


const db= require("./config/db")
db()




// -middlewares-
app.use(morgan("dev"))
app.use(cors({origin:[process.env.CORS_ORIGIN_URL],methods:["GET","POST","PUT","PATCH","DELETE"],credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



// ---staticfiles-
app.use(express.static(path.join(__dirname,"public")))



// session
const min = 1000 * 60 * 60* 24 ;
app.use(session({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: min },
    
}
))


// --routes--
app.use("/admin",adminRouter)
app.use("/",userRouter)


// --port--
const port = process.env.PORT 
app.listen(port,()=>console.log("server running on "+port))








