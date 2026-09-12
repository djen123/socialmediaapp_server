import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET, JWT_EXPIRE = 3600 } = process.env;

// =========================
// Fetch all users
// =========================
export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (e) {
    res.status(500).json({ status: "something wrong" });
  }
};

// =========================
// Fetch single user
// =========================
export const fetchUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json({ user });
  } catch (e) {
    res.status(500).json({ status: "something wrong" });
  }
};

// =========================
// Update user
// =========================
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, avatar },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "user updated",
      data: updatedUser
    });
  } catch (e) {
    res.status(500).json({
      status: "something wrong",
      error: e.message
    });
  }
};

// =========================
// Delete user
// =========================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    res.json({
      message: "user deleted",
      data: deletedUser
    });
  } catch (e) {
    res.status(500).json({
      status: "something wrong",
      error: e.message
    });
  }
};

// =========================
// Signup user
// =========================
export const signupUser = async (req, res) => {
  try {
    const { name, username, email, password, avatar } = req.body;

    // Guard clauses
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret missing" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashPassword,
      avatar
    });

    const { _id } = newUser;

    const token = jwt.sign(
      { _id, name, username ,avatar},
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: JWT_EXPIRE * 1000
    });

    res.status(201).json({
      message: `@${username} registered`
    });

  } catch (e) {
    console.log("SIGNUP ERROR:", e);

    if (e.name === "MongoServerError" && e.code === 11000) {
      const field = Object.keys(e.keyPattern)[0];
      return res.status(400).json({
        message: "Invalid input",
        error: `A user with ${field} already exists`
      });
    }

    res.status(500).json({ status: "something wrong" });
  }
};

// =========================
// Login user
// =========================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Guard clause
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid password" });
    }

    const { _id, name, username,avatar } = user;

    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret missing" });
    }
    //attach avatar to token 
    const token = jwt.sign(
      { _id, name, username,avatar },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

   res.cookie("token", token, {
      httpOnly: true,
      secure: false,      // must be false on localhost
      sameSite: "lax"
    });

    res.status(200).json({
      message: `@${username} logged in successfully`
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ status: "something wrong" });
  }
};

// =========================
// Logout user
// =========================
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "you have successfully logged out" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

// =========================
// get current user
// =========================

export const getCurrentUser = async(req,res)=>{
  res.json({
    user:req.user
  })
}


