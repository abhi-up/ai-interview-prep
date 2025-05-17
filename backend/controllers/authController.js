const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

// @desc Register a new user
// @route POST /api/auth/register
// @access Public

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    })

    // return user data and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    })
  } catch (error) {
    res
      .status(400)
      .json({ message: "User registration failed", error: error.message })
  }
}

// @desc Login user
// @route POST /api/auth/login
// @access Public

const loginUser = async (req, res) => {}

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private(requires JWIT token)
const getUserProfile = async (req, res) => {}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
}
