const userSchema = require("../model/user-model");

const deleteData = async (req, res) => {
  const mail = req.body.email;
  console.log(mail);
  const query = { email: mail };
  try {
    const result = await userSchema.deleteOne(query);
    if (result.deletedCount === 1) {
      userSchema.find({}, { _id: 0, __v: 0 }).then((rslt) => {
        return res.status(200).send(rslt);
      });
      console.log("Successfully deleted one document.");
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
        return res.status(404).json({message:"Could find the email"});
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteData = deleteData;
