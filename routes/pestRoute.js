import express from "express";
const router = express.Router();
import {
    getPests,
    getPestById,
    createPest,
    updatePest,
    deletePest,
    createPestReview,
} from '../controllers/pestController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getPests).post(protect, admin, createPest);
router.route('/:id/reviews').post(protect, checkObjectId, createPestReview);
router
  .route('/:id')
  .get(checkObjectId, getPestById)
  .put(protect, admin, checkObjectId, updatePest)
  .delete(protect, admin, checkObjectId, deletePest);

export default router;

