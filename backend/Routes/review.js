/**
 * @description: This file is used to create the routes for the review.
 * 
 * @api: /api/v1/reviews
 */

import express from "express";

// Import the functions from the reviewController.
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewController.js";

// Import the authenticate and restrict functions from the verifyToken file.
import { authenticate, restrict } from "./../auth/veriftToken.js";

const router = express.Router({ mergeParams: true });

// Create the instance of the router.
router
  .route("/")
  .get(getAllReviews)
  .post(authenticate, restrict(["patient"]), createReview);

export default router;
