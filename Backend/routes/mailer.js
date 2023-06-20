const mailerController = require("../controllers/mailerController");

const router = require("express").Router();

router.post("/", mailerController.sendMail);

module.exports = router;
