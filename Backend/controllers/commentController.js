const { Comment } = require("../model/comment");
const { post } = require("../routes/comment");

const commentController = {
  addComment: async (req, res) => {
    try {
      const newComment = new Comment(req.body);
      const saveComment = await newComment.save();
      res.status(200).json(saveComment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAComment: async (req, res) => {
    try {
      const getComment = await Comment.find({ seafoodId: req.params.slug });
      res.status(200).json(getComment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addCommentList: async (req, res) => {
    try {
      const newComment = await Comment.findById(req.params.slug);
      const saveComment = new Comment(req.body);
      await newComment.updateOne({ $push: { comment: saveComment.comment } });
      res.status(200).json("Update success");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const newComment = await Comment.findOneAndUpdate(
        {
          "comment._id": req.params.slug,
        },
        {
          $pull: {
            comment: { _id: req.params.slug },
          },
        }
      );

      res.status(200).json("update successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  editComment: async (req, res) => {
    try {
      const newComment = await Comment.find({
        "comment._id": req.body._id,
      });
      // await newComment.findOneAndUpdate(
      //   {
      //     "comment._id": req.body._id,
      //   },
      //   {
      //     $set: {
      //       "comment.content": req.body.content,
      //     },
      //   }
      // );
      res.status(200).json("success");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = commentController;
