import asyncHandler from "../middleware/asyncHandler.js";
import Pest from "../MODELS/pestModel.js";
import { generateObjectId } from "../utils/generateObjId.js";

const getPests = asyncHandler(async (req, res) => {
  const pests = await Pest.find({});

  res.json({ pests });
});

const getPestsCount = asyncHandler(async (req, res) => {
  const totalPests = await Pest.countDocuments({});

  res.json({ totalPests });
});
// @desc    Fetch single pest
// @route   GET /api/pest/:id
// @access  Public

const getPestById = asyncHandler(async (req, res) => {
  const pest = await Pest.findById(req.params.id);

  //   console.log(storyAuthor);
  if (pest) {
    res.json(pest);
  } else {
    res.status(404);
    return next(new Error("Resource not found"));
  }
});

// @desc    Create new review
// @route   POST /api/pests/:id/reviews
// @access  Private
const createPestReview = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const pest = await Pest.findById(req.params.id);

  if (pest) {
    const alreadyReviewed = pest.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    const review = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };

    pest.reviews.push(review);

    await pest.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Pest not found");
  }
});

const createPest = asyncHandler(async (req, res) => {
  const { name, description, img, usage, price, type, indication } = req.body;

  const pest = new Pest({
    name,
    description,
    img,
    usage,
    price,
    type,
    indication,
  });

  const createdPest = await pest.save();
  res.status(201).json(createdPest);
});

const deletePest = asyncHandler(async (req, res) => {
  const pest = await Pest.findById(req.params.id);
  console.log(pest);
  if (!pest) {
    return res.status(404).json({ message: "Pest not found" });
  }
  await Pest.deleteOne({ _id: pest._id });
  res.json({ message: "Pest removed" });
});

const updatePest = asyncHandler(async (req, res) => {
  const { name, description, img, usage, price, type, indication } = req.body;

  const pestId = req.params.id;

  const pest = await Pest.findById(pestId);

  if (pest) {
    pest.name = name || pest.name;
    pest.usage = usage || pest.usage;
    pest.description = description || pest.description;
    pest.price = price || pest.price;
    pest.type = type || pest.type;
    pest.indication = indication || pest.indication;
    pest.img = img || pest.img;

    const updatedPest = await pest.save();
    res.json(updatedPest);
  } else {
    res.status(404);
    throw new Error("Pest not found");
  }
});
export {
  getPests,
  getPestById,
  getPestsCount,
  createPestReview,
  createPest,
  deletePest,
  updatePest,
};
