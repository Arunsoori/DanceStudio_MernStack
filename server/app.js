// --importing modules---
require("dotenv").config()

const express = require("express")
const app =express()
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const adminRouter=require("./routes/adminRouter")
const userRouter=require("./routes/userRouter")

const db= require("./config/db")
db()




// -middlewares-
app.use(morgan("dev"))
app.use(cors({origin:[process.env.CORS_ORIGIN_URL],methods:["GET","POST","PUT","PATCH","DELETE"],credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))



// ---staticfiles-
app.use(express.static(path.join(__dirname,"public")))


// --routes--
app.use("/admin",adminRouter)
app.use("/",userRouter)


// --port--
const port = process.env.PORT 
app.listen(port,()=>console.log("server running on "+port))








