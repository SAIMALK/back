import express from "express";
const router = express.Router();
import {
    getPests,
    getPestById,
    getPestsCount,
    createPestReview,
    createPest,
    deletePest,
    updatePest,
} from '../controllers/pestController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getPests).post(protect, createPest);
router.route('/count').get(getPestsCount);
router.route('/:id/reviews').post(protect, checkObjectId, createPestReview);
router
  .route('/:id')
  .get(checkObjectId, getPestById)
  .delete(protect,checkObjectId, deletePest)
  .put(protect, checkObjectId, updatePest)

export default router;

