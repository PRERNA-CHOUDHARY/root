/**
 * The auth controller has the following functions:
 *
 * register: Register a user.
 * login: Login a user.
 */

// Import the jwt and bcrypt modules.
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Import the User and Doctor models.
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Generate a token.
const generateToken = (user) => {
  // Generate a token with the user id and role. (Valid for 1 day)
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
};

// Register a user.
export const register = async (req, res) => {
  try {
    // Get the email, password, name, role, photo, and gender from the request body.
    const { email, password, name, role, photo, gender } = req.body;
    let user = null;

    // Check if the user is a patient/doctor.
    if (role == "patient") {
      user = await User.findOne({ email });
    } else if (role == "doctor") {
      user = await Doctor.findOne({ email });
    }

    // Check if the user already exists.
    if (user) return res.status(400).json({ message: "User already exist" });

    // Generate a salt and hash the password.
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // If the user is a patient, create a new user.
    if (role == "patient") {
      user = new User({
        name,
        password: hashPassword,
        email,
        photo,
        gender,
        role,
      });
    }

    // If the user is a doctor, create a new doctor.
    if (role == "doctor") {
      user = new Doctor({
        name,
        password: hashPassword,
        email,
        photo,
        gender,
        role,
      });
    }
    await user.save();
    res
      .status(200)
      .json({ sucess: true, message: "User successfully created" });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "Internal server error,Try again",
      error: `${err}`,
    });
  }
};

// Login a user.
export const login = async (req, res) => {
  // Get the email of the user from the request body.
  const email = req.body.email;
  try {
    let user = null;

    // Check if the user is a patient/doctor.
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    }

    // Check if the user exists.
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct.
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    // Generate a token.
    const token = generateToken(user);

    // Return the user data and token.
    const { password, role, appointments, ...rest } = user._doc;
    res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: false, message: "Failed to login ,try again" });
  }
};
