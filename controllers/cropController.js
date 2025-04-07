import asyncHandler from "../middleware/asyncHandler.js";
import Crop from "../MODELS/cropModel.js";
import Seed from "../MODELS/seedModel.js"; // Ensure the path is correct
import { generateObjectId } from "../utils/generateObjId.js";

// @desc    Fetch all crops
// @route   GET /api/crops
// @access  Public
const getCrops = asyncHandler(async (req, res) => {
  const crops = await Crop.find({});

  res.json({ crops });
});

const getCropsCount = asyncHandler(async (req, res) => {
  const totalCrops  = await Crop.countDocuments({ });

  res.json({ totalCrops  });
});

// @desc    Fetch single crop
// @route   GET /api/crops/:id
// @access  Public
const getCropById = asyncHandler(async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id)
      .populate('seeds')         
      .populate('fertilizers')   
      .populate('pests')        
      .populate('reviews.user', 'name'); 

    if (crop) {
      res.json(crop);
    } else {
      res.status(404);
      throw new Error("Crop not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
});

// @desc    Fetch crops by seed ID
// @route   GET /api/crops/seed/:seedId
// @access  Public
const getCropBySeedId = asyncHandler(async (req, res) => {
  const seedId = req.params.seedId;

  try {
    const crops = await Crop.find({ seeds: seedId });
    res.json(crops);
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
});



// @desc    Create new review
// @route   POST /api/crops/:id/reviews
// @access  Private
const createCropReview = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const crop = await Crop.findById(req.params.id);

  if (crop) {
      // const alreadyReviewed = crop.reviews.find(
      //     (r) => r.user.toString() === req.user._id.toString()
      // );

      // if (alreadyReviewed) {
      //     res.status(400);
      //     throw new Error("Crop already reviewed");
      // }

      const review = {
          name: req.user.name,
          comment,
          user: req.user._id,
          createdAt: new Date().toISOString(), // Add createdAt field
      };

      crop.reviews.push(review);

      await crop.save();
      
      // Return the new review
      res.status(201).json(review);
  } else {
      res.status(404);
      throw new Error("Crop not found");
  }
});

const createCrop = asyncHandler(async (req, res) => {
  const user = req.user._id; // Assuming user authentication middleware sets req.user

  const {  name,
    season,
    description,
    durationPeriod,
    img,
    durationInMonths,
    avgProfit,
    fertilizer,
    pest,
    seed, } = req.body;
console.log(req.body);
  const crop = new Crop({
    user,
    name,
    season,
    description,
    durationPeriod,
    img,
    durationInMonths,
    avgProfit,
    fertilizers: [fertilizer],
    pests: [pest],
    seeds: [seed]
  });

  const createdCrop = await crop.save();
  res.status(201).json(createdCrop);
});

const deleteCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  console.log(crop);
  if (!crop) {
    console.log('sasas')
    return res.status(404).json({ message: 'Crop not found' });
  }

  await Crop.deleteOne({ _id: crop._id });
  res.json({ message: 'Crop removed' });
});

const updateCrop = asyncHandler(async (req, res) => {

  const { name,
    season,
    description,
    durationPeriod,
    img,
    durationInMonths,
    avgProfit,
    fertilizer,
    pest,
    seed, } = req.body;

    const cropId = req.params.id;

  const crop = await Crop.findById(cropId);

  if (crop) {
    crop.name = name || crop.name;
    crop.season = season || crop.season;
    crop.description = description || crop.description;
    crop.durationPeriod = durationPeriod || crop.durationPeriod;
    crop.img = img || crop.img;
    crop.durationInMonths = durationInMonths || crop.durationInMonths;
    crop.avgProfit = avgProfit || crop.avgProfit;
    crop.fertilizers = fertilizer !== undefined ? fertilizer : crop.fertilizers;
    crop.pests = pest !== undefined ? pest : crop.pests;
    crop.seeds = seed !== undefined ? seed : crop.seeds;
    const updatedCrop = await crop.save();
    res.json(updatedCrop);
  } else {
    res.status(404);
    throw new Error("Crop not found");
  }
});
// @desc    Get top rated crops
// @route   GET /api/crops/top
// @access  Public
const getTopCrops = asyncHandler(async (req, res) => {
  const crops = await Crop.find({}).sort({ rating: -1 }).limit(3);

  res.json(crops);
});

export {
  getCrops,
  getCropsCount,
  getCropById,
  createCropReview,
  getTopCrops,
  getCropBySeedId,
  createCrop,
  deleteCrop,
  updateCrop,
};
