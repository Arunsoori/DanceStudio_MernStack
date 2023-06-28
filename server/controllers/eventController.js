const eventModel = require ('../model/EventModel')

const AddEvent = async(req,res,next)=>{

    try{
    console.log("in t controller");

        const imagePath = req.files.image[0].path;
        const modifiedImagePath = imagePath.replace(/^public[\\/]+/, "");
        console.log(imagePath,"image");
    
        const event = new eventModel({
          image_url: modifiedImagePath
    
    
        })
        event.save()
        res.json({status:true, message:"event added successfully" })

    }catch{
        res.json({status:false,message:"event not added"})
    }
   

}
const EventFetch = async(req,res,next)=>{
    try{
        const event = await  eventModel.find({})


        console.log(event,"event");
        if(event) return res.json({status:true,event})

    }catch(error){
 res.json({status:false})

    }
}

module.exports={
    AddEvent,
    EventFetch

}