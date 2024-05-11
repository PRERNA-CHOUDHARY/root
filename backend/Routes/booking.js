/**
 * @description: This file is used to define the routes for the booking.
 * 
 * @api: /api/v1/booking/checkout-session/:doctorId
 */

import express from "express";

// Import the authenticate function from the verifyToken file.
import { authenticate } from "./../auth/veriftToken.js";

// Import the getCheckoutSession function from the bookingController file.
import { getCheckoutSession } from "../Controllers/bookingController.js";

const router = express.Router();

// Define the route.
router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);

export default router;
