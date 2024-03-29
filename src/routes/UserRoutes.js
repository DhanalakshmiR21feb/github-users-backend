const express=require("express");
const router = require('express').Router();
const userController=require("../controllers/UserController");

//create a user
router.get('/save-user/:username',userController.save_user);

//find mutual followers
router.get('/find-mutual-followers/:username',userController.mutual_followers);

//search user
router.get('/search-user/:username/:location',userController.search_user);

//soft delete user
router.delete('/delete-user/:username',userController.delete_user);

//update user details such as location, blog, and bio
router.patch('/update-user/:username',userController.update_user);

//list users with sorting
// http://localhost:5000/user/list-users?sortBy=followers
router.get('/list-users',userController.list_users);

module.exports=router;