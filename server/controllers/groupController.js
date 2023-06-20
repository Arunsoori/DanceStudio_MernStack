const groupModel = require('../model/groupModel')
const mongoose = require('mongoose');




const adminAddGroup = async(req,res,next)=>{
    try {
      
    
        console.log(req.body, "body");
        const group = new groupModel({
          name: req.body.name,
          description: req.body.description,
      
        
    
  
        });
      
        group.save();
        res.json({ status: true, message: "group added" });
      } catch (error) {
        res.json({ status: false, message: error.message });
      }


}
const adminListGroup= async(req,res,next)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        console.log(page,"page");
        const limit = 2; // Number of courses per page
    
        const totalgroups = await groupModel.countDocuments({});
        const totalPages = Math.ceil(totalgroups / limit);
    
        const groups = await groupModel
          .find({})
          .skip((page - 1) * limit)
          .limit(limit);
    
        if (groups.length > 0) {
          res.json({ status: true, groupdata: groups, totalPages });
        } else {
          res.json({ status: false, message: "No courses found." });
        }
      } catch (error) {
        res.json({ status: false, message: error.message });
      }
}
const Groupdata= async (req,res,next)=>{
  try{
    const groupdata = await groupModel.find({})
    res.json({status:true, groupdata})

  }catch(error){
    res.json({status:false})
    next(error)
  }

} 
module.exports={
    adminAddGroup,
    adminListGroup,
    Groupdata
}