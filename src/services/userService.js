const User = require("../models/User");
const axios = require("axios");

const saveUser = async (username) => {
  try {
    console.log(username);
    let user = await User.findOne({ username });
    console.log("service outside if ");
    if (user === null) {
      console.log("service inside if");
      const githubResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const githubData = githubResponse.data;
      console.log("github data", githubData);
      const res = await User.create({
        login: username,
        id: githubData.id,
        avatar_url: githubData.avatar_url,
        type: githubData.type,
        name: githubData.name,
        company: githubData.company,
        blog: githubData.blog,
        location: githubData.location,
        email: githubData.email,
        bio: githubData.bio,
        public_repos: githubData.public_repos,
        followers: githubData.followers,
        following: githubData.following,
        created_at: githubData.created_at,
        updated_at: githubData.updated_at,
      });
      console.log("save user service2 ", user);
      //const res = await User.save(user);
      console.log("result", res);
      return res;
    }

    return user;
  } catch (err) {
    throw err;
  }
};
const mutual_followers = async (username) => {
  try {
    // Fetch the user's followers
    const followersResponse = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    const followers = followersResponse.data.map((user) => user.login);

    //fetch the users the user is following
    const followingResponse = await axios.get(
      `https://api.github.com/users/${username}/following`
    );
    const following = followingResponse.data.map((user) => user.login);

    //find mutual followers
    const mutualfollowers = followers.filter((user) =>
      following.includes(user)
    );
    return mutualfollowers;
  } catch (err) {
    throw err;
  }
};

const search_user = async (username, location) => {
  try {
    let query = {};
    if (username) {
      query.login = { $regex: username, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    const users = await User.find(query);
    return users;
  } catch (err) {
    throw err;
  }
};
const delete_user = async (username) => {
  try {
    // console.log("inside delete_user service");
    const user = await User.findOne({ login: username });
    if (!user) return false;
    user.deleted = true;
    await user.save();
    return true;
  } catch (err) {
    throw err;
  }
};
const list_users = async (sortBy) => {
  try {
    const users = await User.find().sort(sortBy);
    return users;
  } catch (err) {
    throw err;
  }
};
const update_user = async (username, updatedData) => {
  try {
    const user = await User.findOneAndUpdate(
      { login: username },
      { $set: updatedData },
      { new: true }
    );
    return user;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  saveUser,
  mutual_followers,
  search_user,
  delete_user,
  list_users,
  update_user,
};
