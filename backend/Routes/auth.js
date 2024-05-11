/**
 * @description: This file is used to define the routes for the authentication.
 * 
 * @api: /api/v1/auth/login
 * @api: /api/v1/auth/register
 */

import express from "express";

// Import the functions from the authController.
import { register, login } from "../Controllers/authController.js";

const router = express.Router();

// Define the routes.
router.post("/register", register);
router.post("/login", login);

export default router;
