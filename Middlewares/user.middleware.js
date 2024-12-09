import { userModel } from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// Register Middleware
export const registerMiddleware = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: `Please fill all credentials`, success: false });
    const result = await userModel.findOne({ email });
    if (result)
      return res
    .status(400)
    .json({ message: `User already exists`, success: false });
    next();
  } catch (error) {
    console.log(`Error in Register Middleware ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal server error`, success: false });
  }
};
// Login Middleware
export const loginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: `Please fill all credentials`, success: false });
    const res1 = await userModel.findOne({ email });
    if (!res1)
      return res
        .status(401)
        .json({ message: `Invalid credentials`, success: false });
    const res2 = await bcryptjs.compare(password, res1.password);
    if (!res2)
      return res
        .status(401)
        .json({ message: `Invalid credentials`, success: false });
    const { _id, name } = res1;
    req.data = { _id, name, email };
    next();
  } catch (error) {
    console.log(`Error in Login Middleware ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal server error`, success: false });
  }
};
// Logout Middleware
export const logoutMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    await jwt.verify(token, process.env.jwt_secret);
    next();
  } catch (error) {
    console.log(`Error in logout middleware ${error.message}`);
    return res.status(400).json({ message: `Invalid cookie`, success: false });
  }
};
// Delete Account Middleware
export const deleteMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return res
        .status(400)
        .json({ message: `Invalid cookie`, success: false });
    const payload = await jwt.decode(token, process.env.jwt_secret);
    const { id, name, email } = payload;
    req.user = { id , name , email};
    next();
  } catch (error) {
    console.log(`Error in delete middleware ${error.message}`);
    return res.status(400).json({ message: `Invalid cookie`, success: false });
  }
};
