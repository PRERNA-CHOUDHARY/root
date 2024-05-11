/**
 * @description: This file defines the schema for the reviews.
 */

import mongoose from "mongoose";

// Import the DoctorSchema.
import DoctorSchema from "./DoctorSchema.js";

// Create the schema.
const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// Populate the user field with the name and photo of the user.
reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "User", select: "name photo" });
  next();
});

// Calculate the average rating and total rating of the doctor.
reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },
    {
      $group: {
        _id: "$doctor",
        totalRating: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  // Update the doctor document with the new stats.
  await DoctorSchema.findByIdAndUpdate(doctorId, {
    totalRating: stats[0].totalRating,
    averageRating: stats[0].averageRating,
  });
  console.log(stats);
};

// Calculate the average rating and total rating of the doctor after saving a review.
reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.doctor);
});
export default mongoose.model("Review", reviewSchema);
