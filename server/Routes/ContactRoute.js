const express = require("express");
const ContactController = require("../Controller/ContactController");

const router = express.Router();

router.route("/").post(ContactController.sendEmail);

module.exports = router;
