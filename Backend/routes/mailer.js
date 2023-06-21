const mailerController = require("../controllers/mailerController");

const router = require("express").Router();

router.post("/", mailerController.sendMail);
router.post('/sendCode', mailerController.sendCode);

module.exports = router;
