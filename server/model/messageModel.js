const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    
        group: {
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
        text: {
            type: String,
        },
        image:{
            type:String
        }
    },
    { timestamps: true }
   
    
  

)

module.exports = new mongoose.model("order",orderSchema)