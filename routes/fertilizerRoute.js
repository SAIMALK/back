import express from "express";
const router = express.Router();
import {
    getFertilizers,
    getFertilizerById,
    getFertilizerCount,
    createFertilizerReview,
    createFertilizer,
    deleteFertilizer,
    updateFertilizer,
} from '../controllers/fertilizerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getFertilizers).post(protect, createFertilizer);
router.route('/count').get(getFertilizerCount);
router.route('/:id/reviews').post(protect, checkObjectId, createFertilizerReview);
router
  .route('/:id')
  .get(checkObjectId, getFertilizerById)
  .delete(protect,checkObjectId, deleteFertilizer)
  .put(protect, checkObjectId, updateFertilizer)

export default router;

