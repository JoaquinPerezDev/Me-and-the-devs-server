const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const articleSchema = new Schema(
  {
    title: {
      type: String
    },
    content: {
      type: String
    },
    summary: {
      type: String
    },
    author: {type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Article = model("Article", articleSchema);

module.exports = Article;