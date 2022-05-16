const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

// This route will get the current user's user profile data rendered on
// the user profile edit page

router.get("/user/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(userId)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err));
});
module.exports = router;


// this route will allow user to edit their profile info

// router.put("/user/:userId", (req, res, next) => {

// })