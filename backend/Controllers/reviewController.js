/**
 * The review controller has the following functions:
 *
 * getAllReviews: Get all the reviews.
 * createReview: Create a review.
 */

// Import the Review model.
import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Get all the reviews.
export const getAllReviews = async (req, res) => {
  try {
    // Find all the reviews.
    const reviews = await Review.find({});
    res
      .status(200)
      .json({ sucess: true, message: "Successful", data: reviews });
  } catch (err) {
    res.status(404).json({ sucess: false, message: "Not found" });
  }
};

// Create a review.
export const createReview = async (req, res) => {
  // If the doctor and user fields are not in the request body, add them.
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.params.userId;

  // Create a new review.
  const newReview = new Review(req.body);
  try {
    // Save the review.
    const savedReview = await newReview.save();

    // Update the doctor with the new review.
    let RESULT = await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: {
        reviews: savedReview._id,
      },
    });
    res
      .status(200)
      .json({ sucess: true, message: "Review Submitted", data: savedReview });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};
