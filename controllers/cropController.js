import asyncHandler from "../middleware/asyncHandler.js";
import Crop from "../MODELS/cropModel.js";
import Seed from "../MODELS/seedModel.js"; // Ensure the path is correct
import { generateObjectId } from "../utils/generateObjId.js";

// @desc    Fetch all crops
// @route   GET /api/crops
// @access  Public
const getCrops = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Crop.countDocuments({ ...keyword });
  const crops = await Crop.find({ ...keyword });

  res.json({ crops });
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

// @desc    Create a crop
// @route   POST /api/crops
// @access  Private/Admin
const createCrop = asyncHandler(async (req, res) => {
  try {
    const { name, description, season, durationInMonths, img, durationPeriod, avgProfit, fertilizers, seeds, pests } = req.body;

    if (!name || !description || !season || !durationInMonths || !img || !durationPeriod || !avgProfit || !fertilizers || !seeds || !pests) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const crop = new Crop({
      name,
      user: req.user._id,
      description,
      fertilizers,
      seeds,
      season,
      durationInMonths,
      img,
      durationPeriod,
      pests,
      avgProfit,
    });

    const createdCrop = await crop.save();
    res.status(201).json(createdCrop);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// @desc    Update a crop
// @route   PUT /api/crops/:id
// @access  Private/Admin
const updateCrop = asyncHandler(async (req, res) => {
  const {
    name,
    fertilizers,
    seeds,
    season,
    description,
    durationPeriod,
    img,
    durationInMonths,
    pests,
    avgProfit,
  } = req.body;

  const crop = await Crop.findById(req.params.id);

  if (crop) {
    crop.name = name;
    crop.fertilizers = fertilizers;
    crop.seeds = seeds;
    crop.season = season;
    crop.img = img;
    crop.season = season;
    crop.durationInMonths = durationInMonths;
    crop.description = description;
    crop.durationPeriod = durationPeriod;
    crop.pests = pests;
    crop.avgProfit = avgProfit;
    const updatedCrop = await crop.save();
    res.json(updatedCrop);
  } else {
    res.status(404);
    throw new Error("Crop not found");
  }
});

// @desc    Delete a crop
// @route   DELETE /api/crops/:id
// @access  Private/Admin
const deleteCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);

  if (crop) {
    await Crop.deleteOne({ _id: crop._id });
    res.json({ message: "Crop removed" });
  } else {
    res.status(404);
    throw new Error("Crop not found");
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


// @desc    Get top rated crops
// @route   GET /api/crops/top
// @access  Public
const getTopCrops = asyncHandler(async (req, res) => {
  const crops = await Crop.find({}).sort({ rating: -1 }).limit(3);

  res.json(crops);
});

export {
  getCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
  createCropReview,
  getTopCrops,
  getCropBySeedId
};
