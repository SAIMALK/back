import asyncHandler from "../middleware/asyncHandler.js";
import Seed from "../MODELS/seedModel.js";
import { generateObjectId } from "../utils/generateObjId.js";

const getSeeds = asyncHandler(async (req, res) => {
 
  const seeds = await Seed.find({ ...keyword });

  res.json({ seeds });
});
const getSeedsCount = asyncHandler(async (req, res) => {
  const totalSeeds  = await Seed.countDocuments({ });

  res.json({ totalSeeds });
});
// @desc    Fetch single seed
// @route   GET /api/seed/:id
// @access  Public

const getSeedById = asyncHandler(async (req, res) => {
  const seed = await Seed.findById(req.params.id);

  //   console.log(storyAuthor);
  if (seed) {
    res.json(seed);
  } else {
    res.status(404);
    return next(new Error("Resource not found"));
  }
});



// @desc    Create new review
// @route   POST /api/seeds/:id/reviews
// @access  Private
const createSeedReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const seed = await Seed.findById(req.params.id);

  if (seed) {
    const alreadyReviewed = seed.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

   

    const review = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };

    seed.reviews.push(review);

   ;

    await seed.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Seed not found");
  }
});


const createSeed = asyncHandler(async (req, res) => {
  const user = req.user._id; // Assuming user authentication middleware sets req.user

  const {  name,
    description,
    img,
    usage,
    price,
    type,} = req.body;
console.log(user);
  const seed = new Seed({
    user,
    name,
    description,
    img,
    usage,
    price,
    type,
  });

  const createdSeed = await seed.save();
  res.status(201).json(createdSeed);
});

const deleteSeed = asyncHandler(async (req, res) => {
  const seed = await Seed.findById(req.params.id);
  console.log(seed);
  if (!seed) {
    return res.status(404).json({ message: "Seed not found" });
  }
  await Seed.deleteOne({ _id: seed._id });
  res.json({ message: "Seed removed" });
});

const updateSeed = asyncHandler(async (req, res) => {
  const { name, description, img, usage, price, type } = req.body;

  const seedId = req.params.id;

  const seed = await Seed.findById(seedId);

  if (seed) {
    seed.name = name || seed.name;
    seed.usage = usage || seed.usage;
    seed.description = description || seed.description;
    seed.price = price || seed.price;
    seed.type = type || seed.type;
    seed.img = img || seed.img;

    const updatedSeed = await seed.save();
    res.json(updatedSeed);
  } else {
    res.status(404);
    throw new Error("Seed not found");
  }
});

export {
  getSeeds,
  getSeedById,
  getSeedsCount,
  createSeedReview,
  createSeed,
  deleteSeed,
  updateSeed
};
