const express = require("express");
const router = express.Router();
const data = require("../../data.js");

router.get("/", (req, res) => {
  res.json({ users: data.users });
});

router.delete("/:id", (req, res) => {
  let deletedUser;
  data.users = data.users.filter((user) => {
    if (user.id == req.params.id) {
      deletedUser = user;
      return false;
    } else {
      deletedUser = "User not found!";
      return true;
    }
  });
  res.json({ user: deletedUser });
});

router.put("/:id", (req, res) => {
  const existingUser = data.users.find((user) => {
    return user.id == req.params.id;
  });
  existingUser.email = req.body.email;
  res.json({ user: existingUser });
});

router.get("/:id", (req, res) => {
  const user = data.users.find((user) => user.id == req.params.id);
  if (!user) {
    res.json("user not found!");
  }
  res.json({ user: user });
});

router.post("/", (req, res) => {
  const user = {
    id: data.users.length + 1,
    email: req.body.email,
  };
  data.users.push(user);
  res.json({ user: user });
});

router.patch("/:id", (req, res) => {
  const existingUser = data.users.find((user) => {
    return user.id == req.params.id;
  });
  if (!existingUser) {
    res.status(404);
    res.json({ error: "film does not exist" });
    return;
  }
  if (req.body.email) {
    existingUser.email = req.body.email;
  }
  res.json({ film: existingUser });
});

module.exports = router;
