import express from "express";
const router = express.Router();
import {
    getSeeds,
    getSeedById,
    getSeedsCount,
    createSeedReview,
    createSeed,
    deleteSeed,
    updateSeed
} from '../controllers/seedController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getSeeds).post(protect, createSeed);
router.route('/count').get(getSeedsCount);
router.route('/:id/reviews').post(protect, checkObjectId, createSeedReview);
router
  .route('/:id')
  .get(checkObjectId, getSeedById)
  .delete(protect,checkObjectId, deleteSeed)
  .put(protect, checkObjectId, updateSeed)

export default router;

