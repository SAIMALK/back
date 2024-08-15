import asyncHandler from "../middleware/asyncHandler.js";
import Fertilizer from "../MODELS/fertilizerModel.js";
import { generateObjectId } from "../utils/generateObjId.js";

const getFertilizers = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Fertilizer.countDocuments({ ...keyword });
  const fertilizers = await Fertilizer.find({ ...keyword });

  res.json({ fertilizers });
});

// @desc    Fetch single fertilizer
// @route   GET /api/fertilizer/:id
// @access  Public

const getFertilizerById = asyncHandler(async (req, res) => {
  const fertilizer = await Fertilizer.findById(req.params.id);

  //   console.log(storyAuthor);
  if (fertilizer) {
    res.json(fertilizer);
  } else {
    res.status(404);
    return next(new Error("Resource not found"));
  }
});

// @desc    Create a fertilizer
// @route   POST /api/fertilizers
// @access  Private/Admin
const createFertilizer = asyncHandler(async (req, res) => {
  const fertilizer = new Fertilizer({
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

  const createdFertilizer = await fertilizer.save();
  res.status(201).json(createdFertilizer);
});

// @desc    Update a fertilizer
// @route   PUT /api/fertilizers/:id
// @access  Private/Admin
const updateFertilizer = asyncHandler(async (req, res) => {
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

  const fertilizer = await Fertilizer.findById(req.params.id);

  if (fertilizer) {
    fertilizer.title = title;
    fertilizer.genre = genre;
    fertilizer.type = type;
    fertilizer.status = status;
    fertilizer.cover = cover;
    fertilizer.plot = plot;
    fertilizer.rank = rank;
    fertilizer.rating = rating;
    fertilizer.date = date;
    fertilizer.chapters = chapters;
    fertilizer.author = author;
    const updatedFertilizer = await fertilizer.save();
    res.json(updatedFertilizer);
  } else {
    res.status(404);
    throw new Error("Fertilizer not found");
  }
});

// @desc    Delete a fertilizer
// @route   DELETE /api/fertilizers/:id
// @access  Private/Admin
const deleteFertilizer = asyncHandler(async (req, res) => {
  const fertilizer = await Fertilizer.findById(req.params.id);

  if (fertilizer) {
    await Fertilizer.deleteOne({ _id: fertilizer._id });
    res.json({ message: "Fertilizer removed" });
  } else {
    res.status(404);
    throw new Error("Fertilizer not found");
  }
});

// @desc    Create new review
// @route   POST /api/fertilizers/:id/reviews
// @access  Private
const createFertilizerReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const fertilizer = await Fertilizer.findById(req.params.id);

  if (fertilizer) {
    const alreadyReviewed = fertilizer.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Fertilizer already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    fertilizer.reviews.push(review);

    fertilizer.numReviews = fertilizer.reviews.length;

    fertilizer.rating =
      fertilizer.reviews.reduce((acc, item) => item.rating + acc, 0) /
      fertilizer.reviews.length;

    await fertilizer.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Fertilizer not found");
  }
});

export {
  getFertilizers,
  getFertilizerById,
  createFertilizer,
  updateFertilizer,
  deleteFertilizer,
  createFertilizerReview,
};
