const userSchema = require("../model/user-model");

//
const updateData = async (req, res) => {
  console.log(`Updation request received for ${req.body.oldEmail}`);
  try {
    const { oldEmail, email, name, mobileNo, hobbies } = req.body;
    if (email.includes("@") && email.includes(".")) {
      const filter = { email: oldEmail };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          email: email,
          name: name,
          mobileNo: mobileNo,
          hobbies: hobbies,
        },
      };
      const rslt = await userSchema.updateOne(filter, updateDoc, options);
      console.log(rslt);
      return res.status(200).json({ message: "ok" });
    } else {
      return res.status(400).json({ code: 3 });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ code: 2 });
  }
};

exports.updateData = updateData;
