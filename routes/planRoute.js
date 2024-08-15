import express from "express";
const router = express.Router();
import {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
  getPlansByCropId,
} from "../controllers/planController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

// Route to get all plans or create a new plan (authenticated users only for POST)
router.route("/")
  .get(protect, getPlans)  // Protect this route if you want only authenticated users to fetch plans
  .post(protect, createPlan);

// Route to get plans by crop ID (public access, but can be changed based on requirements)
router.route("/crop/:cropId")
  .get(getPlansByCropId);

// Routes to get, update, or delete a specific plan by ID
router.route("/:id")
  .get(checkObjectId, getPlanById)  // Use checkObjectId to validate ID
  .put(protect, checkObjectId, updatePlan)  // Protect this route to allow updates only for authenticated users
  .delete(protect, admin, checkObjectId, deletePlan);  // Protect this route to allow deletion only for admins

export default router;
