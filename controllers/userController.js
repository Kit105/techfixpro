const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler"); // asyncHandler is used to wrap async functions in try/catch blocks
const bcrypt = require("bcrypt"); // bcrypt is used to hash passwords

// @desc    Get all users
// @route   GET /users
// @access  Private

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password").lean();
  if (!users?.length) {
    return res.status(404).json({ message: "No users found" });
  }
  res.status(200).json(users);
});

// @desc   Create new user
// @route  POST /users
// @access Private

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  // confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  // check if user already exists
  const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(400).json({ message: "Username already exists" });
        }   
    
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10); 

    const userObj = { username, password: hashedPassword, roles };

    const user = await User.create(userObj); // create and save user to db

    if (!user) {
        return res.status(500).json({ message: "Error creating user" });
    }

    res.status(201).json(`User ${username} created successfully`);
});

// @desc   Update user
// @route  PATCH /users
// @access Private

const updateUser = asyncHandler(async (req, res) => {

    const { id, username, password, roles, active } = req.body;

    // confirm data
    if (!id || !username || typeof active !== 'boolean' || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // check if username already exists
    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate && duplicate._id.toString() !== id) { // if duplicate exists and it's not the current user
        return res.status(400).json({ message: "Username already exists" });
    }

    
    user.username = username;
    user.password = hashedPassword;
    user.roles = roles;
    user.active = active;
    
    if (password) {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json(`User ${username} updated successfully`);

});

// @desc   Delete user
// @route  DELETE /users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    const note = await Note.findOne({ user: id }).lean().exec();

    if (note) {
        return res.status(400).json({ message: "User has notes, cannot delete" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const result = await user.deleteOne();

    const reply = `User ${user.username} with id ${id} deleted successfully`;

    res.status(200).json(reply);

});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
