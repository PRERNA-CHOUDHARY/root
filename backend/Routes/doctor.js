/**
 * @description: This file contains the routes for the doctor.
 * 
 * @api: /api/v1/doctors
 * @api: /api/v1/doctors/:id
 * @api: /api/v1/doctors/profile/me
 */

import express from "express";

// Import the functions from the doctorController.
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctor,
  doctorProfile,
} from "../Controllers/doctorController.js";

// Import the authenticate and restrict functions from the verifyToken file.
import { authenticate, restrict } from "../auth/veriftToken.js";

// Import the reviewRouter from the review.js file.
import reviewRouter from "./../Routes/review.js";

const router = express.Router();

// Define the routes.
router.use("/:doctorId/reviews", reviewRouter);
router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), doctorProfile);

export default router;
