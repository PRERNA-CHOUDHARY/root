/**
 * @description: This file is used to define the routes for the user.
 *
 * @api: /api/v1/users/:id
 * @api: /api/v1/users
 * @api: /api/v1/users/profile/me
 * @api: /api/v1/users/appointments/my-appointments
 */

import express from "express";

// Import the functions from the userController.
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js";

// Import the authenticate and restrict functions from the verifyToken file.
import { authenticate, restrict } from "../auth/veriftToken.js";
const router = express.Router();

// Define the routes.
router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.put("/:id", authenticate, restrict(["patient"]), updateUser);
router.delete(":/id", authenticate, restrict(["patient"]), deleteUser);
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

export default router;
