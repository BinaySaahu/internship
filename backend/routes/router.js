const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Controllers
const deleteData = require("../controllers/deleteData");
const getData = require("../controllers/getData");
const sendEmail = require("../controllers/sendEmail");
const updateData = require("../controllers/updateData");
const postData = require("../controllers/postData");

//registration
router.post("/postData", postData.postData);
router.post("/updateData", updateData.updateData);
router.post("/deleteData", deleteData.deleteData);
router.get("/getData", getData.getData);
router.post("/sendEmail", sendEmail.sendEmail);



module.exports = router;
