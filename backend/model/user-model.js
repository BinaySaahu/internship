const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationData = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobileNo: { type: String, required: true },
  hobbies:{type: String,required: true},
});

module.exports = mongoose.model("userdb", registrationData);
