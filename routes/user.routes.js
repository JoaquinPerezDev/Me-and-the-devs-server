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

router.put("/user/:userId/edit", (req, res, next) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  if ( name.length <= 1) {
    res.status(400).json({ message: "Please provide a real name" });
    return;
  }
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//   if (!emailRegex.test(email)) {
//     res.status(400).json({ message: "Provide a valid email address." });
//     return;
//   }


  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((error) => res.json(error));
});
