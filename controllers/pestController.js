import asyncHandler from "../middleware/asyncHandler.js";
import Pest from "../MODELS/pestModel.js";
import { generateObjectId } from "../utils/generateObjId.js";

const getPests = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Pest.countDocuments({ ...keyword });
  const pests = await Pest.find({ ...keyword });

  res.json({ pests });
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

// @desc    Create a pest
// @route   POST /api/pests
// @access  Private/Admin
const createPest = asyncHandler(async (req, res) => {
  const pest = new Pest({
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

  const createdCrop = await pest.save();
  res.status(201).json(createdCrop);
});

// @desc    Update a pest
// @route   PUT /api/pests/:id
// @access  Private/Admin
const updatePest = asyncHandler(async (req, res) => {
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

  const pest = await Pest.findById(req.params.id);

  if (pest) {
    pest.title = title;
    pest.genre = genre;
    pest.type = type;
    pest.status = status;
    pest.cover = cover;
    pest.plot = plot;
    pest.rank = rank;
    pest.rating = rating;
    pest.date = date;
    pest.chapters = chapters;
    pest.author = author;
    const updatedCrop = await pest.save();
    res.json(updatedCrop);
  } else {
    res.status(404);
    throw new Error("Pest not found");
  }
});

// @desc    Delete a pest
// @route   DELETE /api/pests/:id
// @access  Private/Admin
const deletePest = asyncHandler(async (req, res) => {
  const pest = await Pest.findById(req.params.id);

  if (pest) {
    await Pest.deleteOne({ _id: pest._id });
    res.json({ message: "Pest removed" });
  } else {
    res.status(404);
    throw new Error("Pest not found");
  }
});

// @desc    Create new review
// @route   POST /api/pests/:id/reviews
// @access  Private
const createPestReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const pest = await Pest.findById(req.params.id);

  if (pest) {
    const alreadyReviewed = pest.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Pest already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    pest.reviews.push(review);

    pest.numReviews = pest.reviews.length;

    pest.rating =
      pest.reviews.reduce((acc, item) => item.rating + acc, 0) /
      pest.reviews.length;

    await pest.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Pest not found");
  }
});

export {
  getPests,
  getPestById,
  createPest,
  updatePest,
  deletePest,
  createPestReview,
};
