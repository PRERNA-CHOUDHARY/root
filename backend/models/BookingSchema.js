/**
 * @description: This file defines the schema for the booking collection in the database.
 */

import mongoose from "mongoose";

// Create the schema.
const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    mode: {
      type: String,
      enum: ["chat", "video"],
      default: "chat",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
