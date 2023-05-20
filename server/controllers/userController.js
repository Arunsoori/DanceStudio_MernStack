const userModel = require("../model/userModel");

module.exports.doSignup = async (req, res, next) => {
  try {
    const { firstName, email, password } = req.body;

    const existingUser =await userModel.findOne({ email:email });
    console.log(existingUser, "existing");
    if (existingUser) {
      res.json({ error: "email already in use" });
    } else {
      const newUser = new userModel({
        firstName,
        email,
        password,
      });

 req.session.email= req.body.email
      const user = await newUser.save();
      res.status(201).json({ created: true });
      next()
    }
  } catch (err) {
    res.json({ created: false });
  }
};
