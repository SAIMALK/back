import asyncHandler from "../middleware/asyncHandler.js";
import Seed from "../MODELS/seedModel.js";
import { generateObjectId } from "../utils/generateObjId.js";

const getSeeds = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Seed.countDocuments({ ...keyword });
  const seeds = await Seed.find({ ...keyword });

  res.json({ seeds });
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

// @desc    Create a seed
// @route   POST /api/seeds
// @access  Private/Admin
const createSeed = asyncHandler(async (req, res) => {
  const seed = new Seed({
    title: "Sample Title",
    type: "Novel",
    genre: ["Fantasy"],
    user: req.user._id,
    cover: "/images/sample.jpg",
    status: "Sample Status",
    plot: "Sample Plot",
    chapters: 0,
    author: generateObjectId("1"),
    date: "Mar 22, 2024",
    numReviews: 0,
    rating: 5,
    rank: "1",
  });

  const createdSeed = await seed.save();
  res.status(201).json(createdSeed);
});

// @desc    Update a seed
// @route   PUT /api/seeds/:id
// @access  Private/Admin
const updateSeed = asyncHandler(async (req, res) => {
  const {
    title,
    genre,
    type,
    status,
    cover,
    plot,
    rank,
    rating,
    chapters,
    date,
    author,
  } = req.body;

  const seed = await Seed.findById(req.params.id);

  if (seed) {
    seed.title = title;
    seed.genre = genre;
    seed.type = type;
    seed.status = status;
    seed.cover = cover;
    seed.plot = plot;
    seed.rank = rank;
    seed.rating = rating;
    seed.date = date;
    seed.chapters = chapters;
    seed.author = author;
    const updatedSeed = await seed.save();
    res.json(updatedSeed);
  } else {
    res.status(404);
    throw new Error("Seed not found");
  }
});

// @desc    Delete a seed
// @route   DELETE /api/seeds/:id
// @access  Private/Admin
const deleteSeed = asyncHandler(async (req, res) => {
  const seed = await Seed.findById(req.params.id);

  if (seed) {
    await Seed.deleteOne({ _id: seed._id });
    res.json({ message: "Seed removed" });
  } else {
    res.status(404);
    throw new Error("Seed not found");
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

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Seed already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    seed.reviews.push(review);

    seed.numReviews = seed.reviews.length;

    seed.rating =
      seed.reviews.reduce((acc, item) => item.rating + acc, 0) /
      seed.reviews.length;

    await seed.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Seed not found");
  }
});

export {
  getSeeds,
  getSeedById,
  createSeed,
  updateSeed,
  deleteSeed,
  createSeedReview,
};
