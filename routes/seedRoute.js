import express from "express";
const router = express.Router();
import {
    getSeeds,
    getSeedById,
    createSeed,
    updateSeed,
    deleteSeed,
    createSeedReview,
} from '../controllers/seedController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getSeeds).post(protect, admin, createSeed);
router.route('/:id/reviews').post(protect, checkObjectId, createSeedReview);
router
  .route('/:id')
  .get(checkObjectId, getSeedById)
  .put(protect, admin, checkObjectId, updateSeed)
  .delete(protect, admin, checkObjectId, deleteSeed);

export default router;

