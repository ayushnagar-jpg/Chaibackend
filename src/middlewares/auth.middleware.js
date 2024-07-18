import { asyncHandler } from "../utils/asynHandler.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

export const verifyJWT = asyncHandler(async (req, res, next) => {
   try {
    const token =  req.cookies?.accessToken  ||
      req.header("Authorization")?.replace("Bearer ", "")
 
      if(!token){
          throw new ApiError(401, "Unauthorized access")
      }
 
         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user= await User.findById(decodedToken?._id).select("-password -refreshToken")
 
          if(!user){
               throw new ApiError(401, "User does not exist")
          }
          req.user = user;
             next()
 
   } catch (error) {
     throw ( new ApiError(401, error?.message || "Unauthorized access"));
   }

})