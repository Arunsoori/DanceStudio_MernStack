const messageModel = require('../model/messageModel');
const mongoose = require('mongoose');


const addMessage = async (req, res, next) => {
  console.log("in messageController");
  try {
    const { roomId, message } = req.body;
    console.log(req.body, "body");

    // Create a new message document
    const newMessage = new messageModel({
      roomId,
      message,
      sender: req.user._id, // Assuming you have user authentication and req.user contains the authenticated user's ID
    });

    // Save the message to the database
    await newMessage.save();

    // Broadcast the message to the room using Socket.io
    // const io = req.app.get('io'); // Assuming you have set up Socket.io in your server file
    // io.to(roomId).emit('receiveMessage', newMessage);


    await newMessage.save();
    res.status(200).json({ success: true,newMessage, message: 'Message sent and broadcasted successfully' });
  } catch (error) {
    next(error);
  }
};
const messageDetails = async(req,res,next)=>{

    const roomId = req.body.roomId
    console.log(roomId,"roomid");
    try{
        const messageDetails = await messageModel.find({roomId:roomId})
        console.log(  messageDetails,"lllllllll");
        res.json({messageDetails})
        
    }catch(error){
        next(error)
    }
}

module.exports = {
  addMessage,
  messageDetails
};
