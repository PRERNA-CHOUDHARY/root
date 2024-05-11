/**
 * The auth controller has the following functions:
 *
 * authenticate: Authenticate the user.
 * restrict: Restrict the user.
 */

import jwt from "jsonwebtoken";

// Import the User and Doctor models.
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

// Authenticate the user.
export const authenticate = async (req, res, next) => {
  // Get the token from the request headers.
  const authToken = req.headers.authorization;

  // If the token is not present, return an error.
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ sucess: false, message: "No token , authorization denied" });
  }
  try {
    // Get the token from the request headers.
    const token = authToken.split(" ")[1];

    // Verify the token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }
    return res.status(401).json({ sucess: false, message: "Invalid token" });
  }
};

// Restrict the user.
export const restrict = (roles) => async (req, res, next) => {
  // Get the user id from the request.
  const userId = req.userId;
  let user;

  // Find the user by id and if the user is a patient or doctor, assign the user to the user variable.
  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);
  if (patient) user = patient;
  if (doctor) user = doctor;

  // If the user is not authorized, return an error.
  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ sucess: false, message: "You are not authorized" });
  }
  next();
};
