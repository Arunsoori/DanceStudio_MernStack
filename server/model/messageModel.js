const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Groups"
      },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        type:{
            type:String,
            require:true
        },
        message: {  // Update field name to "message"
            type: String
          },
        image:{
            type:String
        }
    },
    { timestamps: true }
   
    
  

)

module.exports = new mongoose.model("message",messageSchema)