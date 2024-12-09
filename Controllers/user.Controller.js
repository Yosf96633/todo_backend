import { userModel } from "../Models/userModel.js";
import { todoModel } from "../Models/todoModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 12);
    await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ message: `Successfully register`, success: true });
  } catch (error) {
    console.log(`Error in Register ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal server error`, success: false });
  }
};
export const Login = async (req, res) => {
  try {
    const { _id, name, email } = req.data;
    const token = await jwt.sign(
      {
        id: _id,
        name,
        email,
      },
      process.env.jwt_secret,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
      httpOnly: true,
      sameSite: "None",
      secure: false,

    });
    return res.status(200).json({
      message: `Login successfully`,
      data: {
        id: _id,
        name,
        email,
      },
      success: true,
    });
  } catch (error) {
    console.log(`Error in Login ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal server error`, success: false });
  }
};
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: `Successfully logout`, success: true });
  } catch (error) {
    console.log(`Error in Logout ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal server error`, success: false });
  }
};
export const DeleteAccount = async (req, res) => {
  try {
    const { id } = req.user;
    const data = await userModel.findOneAndDelete({_id:id});
    await todoModel.findOneAndDelete({userID:id})
    if(!data)
      return res
    .status(400)
    .json({ message:`Document not found`, success: false });
    res.clearCookie("token");
    return res
    .status(200)
    .json({ message: `Account with name ${data.name} delete successfully`, success: true });
  } catch (error) {
    console.log(`Error in DeleteAccount ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal server error`, success: false });
  }
};
