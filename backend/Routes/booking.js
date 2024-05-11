/**
 * @description: This file is used to define the routes for the booking.
 *
 * @api: /api/v1/booking/checkout-session/:doctorId
 * @api: /api/v1/booking/slot/:doctorId/:mode
 */

import express from "express";

// Import the authenticate function from the verifyToken file.
import { authenticate } from "./../auth/veriftToken.js";

// Import the getCheckoutSession function from the bookingController file.
import {
  getCheckoutSession,
  addBookingSlot,
} from "../Controllers/bookingController.js";

const router = express.Router();

// Define the route.
router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
router.post("/slot/:doctorId/:mode", authenticate, addBookingSlot);

export default router;
