import express from "express";
const router = express.Router();
import {
  getCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
  createCropReview,
  getTopCrops,
} from '../controllers/cropController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getCrops).post(protect, admin, createCrop);
router.route('/:id/reviews').post(protect, checkObjectId, createCropReview);
router.get('/top', getTopCrops);
router
  .route('/:id')
  .get(checkObjectId, getCropById)
  .put(protect, admin, checkObjectId, updateCrop)
  .delete(protect, admin, checkObjectId, deleteCrop);

export default router;

