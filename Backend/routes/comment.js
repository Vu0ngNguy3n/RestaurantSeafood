const commentController = require("../controllers/commentController");

const router = require("express").Router();

router.post("/", commentController.addComment);
router.get("/:slug", commentController.getAComment);
router.post("/updateComment/:slug", commentController.addCommentList);
router.put("/edit", commentController.editComment);
router.post("/deleteComment/:slug", commentController.deleteComment);

module.exports = router;
