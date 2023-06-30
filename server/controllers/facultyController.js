const facultyModel = require("../model/facultyModel");
const { ObjectId } = require("mongodb");

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
  // try {
  //   const facultydata = await facultyModel.find({});

  //   if (facultydata) {
  //     res.json({ status: true, facultydata });
  //   } else {
  //     res.json({ status: false, message: "no faculty" });
  //   }
  // } catch (error) {
  //   res.json({ status: false, message: error.message });
  // }
  try {
    const page = parseInt(req.query.page) || 1;
    console.log(page,"page");
    const limit = 2; // Number of courses per page

    const totalCourses = await facultyModel.countDocuments({});
    const totalPages = Math.ceil(totalCourses / limit);

    const faculties = await facultyModel
      .find({status:true})
      .skip((page - 1) * limit)
      .limit(limit);

      const Completefaculties = await facultyModel.find({})

    if (faculties.length > 0) {
      res.json({ status: true, facultydata: faculties, totalPages,Completefaculties });
    } else {
      res.json({ status: false, message: "No faculties found." });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
const FetchFacultydetails = async (req, res, next) => {
  // const stringId = req.params.id;
  // const objectId = new ObjectId(stringId);
  try {
    console.log("in faculty fetch controller");
    const facultydetails = await facultyModel.findOne({ _id: req.params.id });
    console.log(facultydetails, "f details");
    if (facultydetails) {
      res.json({ status: true, facultydetails });
    } else {
      res.json({ status: false, message: error.message });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
const updateFacultyData = async (req, res, next) => {
  const id = req.params.id;
  console.log("inn update facuty ");

  console.log(req.files, " body");
  try {
    if (req.files.image) {
      const imagePath = req.files.image[0].path;
      const modifiedImagePath = imagePath.replace(/^public[\\/]+/, "");

      await facultyModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            image_url: modifiedImagePath,
          },
        }
      );
    }

    await facultyModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          position: req.body.position,
          styles: req.body.styles,
          biography: req.body.biography,
        },
      }
    );
    res.json({ status: true, message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.message });
  }
};

const deleteFaculty = async (req, res, next) => {
  console.log("in controller");
  try {
    const id = req.params.id;
    console.log(id,"id");
    await facultyModel.findOneAndUpdate({ _id: id },{$set:{status:false}});
    const facultydata = await facultyModel.find({status:true});
    console.log(facultydata,"dataaaaaaa");
    res.json({ status:true ,facultydata });
  } catch (error) {
    res.json({ status: false, message: "error" });
  }
};

const ourFaculties = async(req,res,next)=>{
  console.log("in faculty controllers");
  try{
    const facultydetails = await facultyModel.find({})
    res.json({status:true, facultydetails})


  }catch(error){
    res.json({status:false})
    next(error)


  }
}

module.exports = {
  addFaculty,
  listFaculty,
  FetchFacultydetails,
  updateFacultyData,
  deleteFaculty,
  ourFaculties

};
