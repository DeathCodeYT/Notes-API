import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncWrapper } from "./asyncWrapper.js";
import jwt from "jsonwebtoken";

export const verifyUser = asyncWrapper(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.header("authorization")?.split(" ")[1];
  if (!token) throw new ApiError(401, "UnAuthorized Access");
  try {
    
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(payload._id);
    if (!user) {
      throw new ApiError(401, "Invalid Token");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    throw new ApiError(401, "Invalid Token");
  }

  // res.send("sldkfj")
});
