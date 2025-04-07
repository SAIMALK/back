import express from "express";
const router = express.Router();
import {
  getCrops,
  getCropById,
  getCropsCount,
  createCropReview,
  getTopCrops,
  createCrop,
  deleteCrop,
  updateCrop,
} from '../controllers/cropController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getCrops).post(protect, createCrop);
router.route('/count').get(getCropsCount);
router.route('/:id/reviews').post(protect, checkObjectId, createCropReview);
router.get('/top', getTopCrops);
router
  .route('/:id')
  .get(checkObjectId, getCropById)
  .delete(protect,checkObjectId, deleteCrop)
  .put(protect, checkObjectId, updateCrop)
  

export default router;

