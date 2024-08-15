import express from "express";
const router = express.Router();
import {
    getFertilizers,
    getFertilizerById,
    createFertilizer,
    updateFertilizer,
    deleteFertilizer,
    createFertilizerReview,
} from '../controllers/fertilizerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getFertilizers).post(protect, admin, createFertilizer);
router.route('/:id/reviews').post(protect, checkObjectId, createFertilizerReview);
router
  .route('/:id')
  .get(checkObjectId, getFertilizerById)
  .put(protect, admin, checkObjectId, updateFertilizer)
  .delete(protect, admin, checkObjectId, deleteFertilizer);

export default router;

