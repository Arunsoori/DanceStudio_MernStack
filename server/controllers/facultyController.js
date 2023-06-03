const facultyModel = require("../model/facultyModel");
const { ObjectId } = require('mongodb');







const addFaculty = async (req, res, next) => {
    try {
      const imagePath = req.files.image[0].path;
      const modifiedImagePath = imagePath.replace(/^public[\\/]+/, "");
  
      console.log(req.body, "body");
      const faculty = new facultyModel({
        name: req.body.name,
        position: req.body.post,
        styles: req.body.styles,
        biography: req.body.biography,
  
        image_url: modifiedImagePath,
      });
      console.log(faculty, "faculty");
      faculty.save();
      res.json({ status: true, message: "faculty added" });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  };



  const listFaculty = async (req, res, next) => {
    try {
      console.log("called faculty list");
      const facultydata = await facultyModel.find({});
  
      if (facultydata) {
        console.log(facultydata, "facultydata");
        res.json({ status: true, facultydata });
      } else {
        res.json({ status: false, message: "no faculty" });
      }
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  };
  const FetchFacultydetails= async (req,res,next)=>{
    // const stringId = req.params.id;
    // const objectId = new ObjectId(stringId);
   try{
      const facultydetails= await facultyModel.findOne({_id:req.params.id})
      console.log(facultydetails,"f details");
      if(facultydetails){
        res.json({status:true, facultydetails})
      }else{
        res.json({status:false, message: error.message} )
      }
      
   }catch(error){
    res.json({ status:false, message:error.message})
   }
  }


  module.exports={
    addFaculty,
    listFaculty,
    FetchFacultydetails
    


  }