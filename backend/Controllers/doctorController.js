/**
 * The doctor controller has the following functions:
 *
 * updateDoctor: Update the doctor.
 * deleteDoctor: Delete the doctor.
 * getSingleDoctor: Get the single doctor.
 * getAllDoctor: Get all the doctors.
 * doctorProfile: Get the doctor profile.
 */

// Import the models.
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

// Update the doctor.
export const updateDoctor = async (req, res) => {
  // Get the doctor id from the request parameters.
  const id = req.params.id;
  try {
    // Find the doctor by id and update it.
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      sucess: true,
      message: "Successfully Updated",
      data: updateDoctor,
    });
  } catch {
    res.status(500).json({ sucess: false, message: " Failed to Update" });
  }
};

// Delete the doctor.
export const deleteDoctor = async (req, res) => {
  // Get the doctor id from the request parameters.
  const id = req.params.id;
  try {
    // Find the doctor by id and delete it.
    const updateDoctor = await Doctor.findByIdAndDelete(id);
    res.status(200).json({ sucess: true, message: "Successfully Deleted" });
  } catch {
    res.status(500).json({ sucess: false, message: " Failed to Delete" });
  }
};

// Get the single doctor.
export const getSingleDoctor = async (req, res) => {
  // Get the doctor id from the request parameters.
  const id = req.params.id;
  try {
    // Find the doctor by id and select the password.
    const doctor = await Doctor.findById(id).select("-password");
    res
      .status(200)
      .json({ sucess: true, message: "Doctor Found", data: doctor });
  } catch {
    res.status(404).json({ sucess: false, message: "No Doctor found" });
  }
};

// Get all the doctors.
export const getAllDoctor = async (req, res) => {
  try {
    // Extract the query from the request.
    const { query } = req.query;
    let doctors;
    if (query) {
      // Find all the doctors and select the password.
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({}).select("-password");
    }

    res
      .status(200)
      .json({ sucess: true, message: "Doctors Found", data: doctors });
  } catch {
    res.status(404).json({ sucess: false, message: "No Doctor found" });
  }
};

// Get the doctor profile.
export const doctorProfile = async (req, res) => {
  // Get the doctor id from the request.
  const doctorId = req.userId;

  try {
    // Find the doctor by id.
    const doctor = await Doctor.findById(doctorId);

    // Check if the doctor exists.
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const { password, ...rest } = doctor._doc;
    // Find all the appointments of the doctor.
    const appointments = await Booking.find({ doctor: doctorId }).populate(
      "user"
    );

    res.status(200).json({
      success: true,
      message: "Doctor profile found",
      data: { ...rest, appointments },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "sorry, cannot get" });
  }
};
