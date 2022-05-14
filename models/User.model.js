const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true ,
      trim: true,
      required: [true, 'Email is required.'],
    },
    password: { 
    type: String,
    required: [true, 'Password is required.'],
    },
    skill: String,
    experience: String,
    education: String,
    article: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
