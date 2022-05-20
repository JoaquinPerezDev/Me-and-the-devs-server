const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    location: String,
    currentRole: String,
    aboutMe: String,
    contactInfo: String,
    skill: String,
    languages: String,
    interests: String,
    experience: String,
    education: String,
    imageUrl: String,
    project: [{
      description: String,
      projectLink: String,
      features: String,
      madeWith: String
    }],
    link: {
      gitHub: { type: String, default: 'none'},
      linkedIn: { type: String, default: 'none'},
      dev: { type: String, default: 'none'},
      medium: { type: String, default: 'none'},
      twitter: { type: String, default: 'none'}
    },
    articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
