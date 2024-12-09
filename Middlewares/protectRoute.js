import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return res
        .status(401)
        .json({ message: `Unauthenticate user`, success: false }); // Replace to null
    const data = await jwt.decode(token, process.env.jwt_secret);
    const { id, name, email } = data;
    req.user = {
      id,
      name,
      email,
    };
    next();
  } catch (error) {
    console.log(`Error in ProtectRoute ${error.message}`);
    return res
      .status(401)
      .json({ message: `Unauthenticate user`, success: false }); // Replace to null
  }
};
