/**
 * The user controller has the following functions:
 * 
 * updateUser: Update the user.
 * deleteUser: Delete the user.
 * getSingleUser: Get the single user.
 * getAllUser: Get all the users.
 * getUserProfile: Get the user profile.
 * getMyAppointments: Get my appointments.
 */

// Import the Models.
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Update the user.
export const updateUser = async (req, res) => {
  // Get the user id from the request parameters.
  const id = req.params.id;

  try {
    // Find the user by id and update it.
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      sucess: true,
      message: "Successfully Updated",
      data: updateUser,
    });
  } catch {
    res.status(500).json({ sucess: false, message: " Failed to Update" });
  }
};

// Delete the user.
export const deleteUser = async (req, res) => {
  // Get the user id from the request parameters.
  const id = req.params.id;
  try {
    // Find the user by id and delete it.
    const updateUser = await User.findByIdAndDelete(id);
    res.status(200).json({ sucess: true, message: "Successfully Deleted" });
  } catch {
    res.status(500).json({ sucess: false, message: " Failed to Delete" });
  }
};

// Get the single user.
export const getSingleUser = async (req, res) => {
  // Get the user id from the request parameters.
  const id = req.params.id;
  try {
    // Find the user by id and select the password.
    const user = await User.findById(id).select("-password");
    res.status(200).json({ sucess: true, message: "User Found", data: user });
  } catch {
    res.status(404).json({ sucess: false, message: "No user found" });
  }
};

// Get all the users.
export const getAllUser = async (req, res) => {
  try {
    // Find all the users and select the password.
    const user = await User.find({}).select("-password");
    res.status(200).json({ sucess: true, message: "Users Found", data: user });
  } catch {
    res.status(404).json({ sucess: false, message: "No user found" });
  }
};

// Get the user profile.
export const getUserProfile = async (req, res) => {
  // Get the user id from the request.
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    // Check if the user exists.
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return the user profile.
    const { password, ...rest } = user._doc;
    res
      .status(200)
      .json({ success: true, message: "Profile found", data: { ...rest } });
  } catch (err) {
    res.status(500).json({ success: false, message: "cannot get" });
  }
};

// Get my appointments.
export const getMyAppointments = async (req, res) => {
  try {
    // Find all the bookings of the user and populate the doctor field.
    const bookings = await Booking.find({ user: req.userId }).populate(
      "doctor"
    );

    // Return the appointments.
    const doctorId = bookings.map((el) => {
      return el.doctor._id;
    });
    const doctors = await Doctor.find({ _id: { $in: doctorId } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message: "Appointments being fetched",
      data: doctors,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "cannot get" });
  }
};
