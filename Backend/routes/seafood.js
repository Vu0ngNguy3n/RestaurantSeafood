const seafoodController = require("../controllers/seafoodController");

const router = require("express").Router();

// ADD SEAFOOD

router.post("/", seafoodController.addSeafood);

router.get("/", seafoodController.getAllSeafood);
router.get("/:slug", seafoodController.getASeafood);
router.get("/list/:slug", seafoodController.getSeafoods);
router.put('/update',seafoodController.updateSeafood);
router.delete('/delete/:slug',seafoodController.deleteSeafood)

module.exports = router;
