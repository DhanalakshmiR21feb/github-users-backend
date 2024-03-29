const userService = require("../services/userService");

const save_user = async (req, res) => {
  try {
    const { username } = req.params;
    console.log("save user", username);
    let user = await userService.saveUser(username);
    res.json(user);
  } catch (err) {
    console.error("Error saving the user");
    res.status(500).json({ message: err.message });
  }
};
const mutual_followers = async (req, res) => {
  try {
    const { username } = req.params;
    let followers = await userService.mutual_followers(username);

    res.json({ followers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const search_user = async (req, res) => {
  try {
    const { username, location } = req.params;
    let users = await userService.search_user(username, location);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const delete_user = async (req, res) => {
  try {
    const username = req.params.username;
    let deleted = await userService.delete_user(username);
    if (deleted) res.json({ message: "user deleted successfully" });
    else res.json({ message: "user not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const update_user = async (req, res) => {
  try {
    const { username } = req.params;
    const { location, blog, bio } = req.body;
    let user = await userService.update_user(username, { location, blog, bio });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const list_users = async (req, res) => {
  try {
    const { sortBy } = req.query;
    let users = await userService.list_users(sortBy);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  save_user,
  list_users,
  delete_user,
  mutual_followers,
  update_user,
  search_user,
};
