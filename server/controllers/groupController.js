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
const editGroupdata = async (req, res, next) => {
  console.log("in edit group data controller");
  const id = req.params.id;
  console.log(id);
  try {
    const singleGroupData = await groupModel.findOne({ _id: id });

    if (singleGroupData) {
      res.json({ status: true, singleGroupData });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    res.json({ status: false });
  }
};

const singleGroupdetails = async(req,res, next)=>{
  console.log("Called");
  try{
    console.log(req.params.id);
    
    const singleGroupData = await groupModel.find({_id:req.params.id})
  console.log(singleGroupData,"jjh");
  if(singleGroupData){
    res.json({status:true,singleGroupData})
  }


  }catch{

  }
}
const updateGroupData = async (req, res, next) => {

  console.log("inn update  ");
  
  console.log(req.body, " body");
  const objId =  req.params.id
  console.log(objId,"ooo");
  try {
   

    await groupModel.findOneAndUpdate(
      { _id: objId },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
         
        },
      }
    );
    res.json({ status: true, message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.message });
  }
};
const adminDeleteGroup= async(req,res,next)=>{
  try{
    console.log(req.params.id);
   const group= await groupModel.findOne({_id:req.params.id})
   console.log(group,"group");
   if(group){
    group.status = !group.status
    group.save()
    res.json({status:true, group})
   }

  }catch{

  }
}
module.exports={
    adminAddGroup,
    adminListGroup,
    Groupdata,
    editGroupdata,
    singleGroupdetails,
    updateGroupData,
    adminDeleteGroup
    
}