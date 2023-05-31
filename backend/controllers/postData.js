const userSchema = require("../model/user-model");
const User = require("../model/user-model");

//
const postData = async (req, res) => {
  console.log(`request received for ${req.body.email}`);

  const {
    email,
    name,
    mobileNo,
    hobbies,
  } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    console.log("User already exists");
    return res.status(400).json({ code: 1, message: "User already exists" });
  }
  if (email.includes("@") && email.includes('.')) {
    try {
      const data = new userSchema({
        email,
        name,
        mobileNo,
        hobbies,
      });

      await data.save();

      return res.status(200).json({ status: "ok" });
    } catch (err) {
      console.log(" err " + err);
      return res.status(400).json({ code: 2, error: err.message });
    }
  } else {
    console.log("invalid data entered sending err...");
    res.status(400).json({ code: 3, error: "invalid details entered" });
  }
};

exports.postData = postData;