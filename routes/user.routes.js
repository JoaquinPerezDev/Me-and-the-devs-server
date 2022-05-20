const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
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
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.json(err));
});

router.put("/user/project/create", isAuthenticated, (req, res, next) => {
  const id = req.payload._id;
  console.log(req.payload._id, req.body);
  User.findByIdAndUpdate(id, { $push: { project: req.body } }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => {
      throw new Error(`Error while creating the project! ${err}`);
    });
});

router.put("/user/link/create", isAuthenticated, (req, res, next) => {
  const id = req.payload._id;
  console.log(req.payload._id, req.body);
  User.findByIdAndUpdate(id, { link: req.body }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => {
      throw new Error(`Error while adding the link! ${err}`);
    });
});

//This route gets all users to use in the homepage, for the dev spotlight section

router.get("/users", (req, res, next) => {
  User.find()
    .populate("articles")
    .then((allUsers) => res.json(allUsers))
    .catch((err) => res.json(err));
});

// this route will allow user to edit their profile info

router.put("/user/:userId/edit", (req, res, next) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  if (name.length <= 1) {
    res.status(400).json({ message: "Please provide a real name" });
    return;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => {
      console.log(updatedUser);
      res.status(200).json(updatedUser);
    })
    .catch((error) => res.json(error));
});

module.exports = router;
