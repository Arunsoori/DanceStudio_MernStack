const mongoose= require("mongoose")
module.exports= async ()=>{
  await  mongoose.connect(process.env.DATABASEURI,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
        console.log("database connected")
    }).catch((error)=>console.log("error"))
}