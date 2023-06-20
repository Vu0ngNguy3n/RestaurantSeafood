const accountController = require("../controllers/accountController");

const router = require("express").Router();

router.get("/", accountController.login);
router.post("/createAccount", accountController.createAccount);
router.get("/isExistAccount/:slug", accountController.isExistAccount);

module.exports = router;
