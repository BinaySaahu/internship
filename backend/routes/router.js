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


module.exports = router;
