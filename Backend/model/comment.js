const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  seafoodId: {
    type: String,
  },
  comment: [
    {
      userId: {
        type: String,
      },
      displayName: {
        type: String,
      },
      rate: {
        type: Number,
      },
      content: {
        type: String,
      },
    },
  ],
});

let Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
