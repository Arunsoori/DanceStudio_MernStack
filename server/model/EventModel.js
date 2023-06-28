const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
  
    
    image_url:{
        type:String,
       
    }
   
    
     

    

})

module.exports = new mongoose.model("event",eventSchema)