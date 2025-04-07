import asyncHandler from "../middleware/asyncHandler.js";
import Fertilizer from "../MODELS/fertilizerModel.js";
import { generateObjectId } from "../utils/generateObjId.js";

const getFertilizers = asyncHandler(async (req, res) => {
 
  const fertilizers = await Fertilizer.find({ });

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
const getFertilizerCount = asyncHandler(async (req, res) => {
  const totalFertilizer  = await Fertilizer.countDocuments({ });

  res.json({ totalFertilizer  });
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

const createFertilizer = asyncHandler(async (req, res) => {

  const { name,
    description,
    img,
    usage,
    price,
    type,
    indication } = req.body;

  const fertilizer = new Fertilizer({
    name,
    description,
    img,
    usage,
    price,
    type,
    indication
  });

  const createdFertilizer = await fertilizer.save();
  res.status(201).json(createdFertilizer);
});

const deleteFertilizer = asyncHandler(async (req, res) => {
  const fertilizer = await Fertilizer.findById(req.params.id);
  
  if (!fertilizer) {
    return res.status(404).json({ message: 'Fertilizer not found' });
  }

  await Fertilizer.deleteOne({ _id: fertilizer._id });
  res.json({ message: 'Fertilizer removed' });
});

const updateFertilizer = asyncHandler(async (req, res) => {

  const { name, description, img, usage, price, type, indication
     } = req.body;

    const fertilizerId = req.params.id;

  const fertilizer = await Fertilizer.findById(fertilizerId);

  if (fertilizer) {
    fertilizer.name = name || fertilizer.name;
    fertilizer.usage = usage || fertilizer.usage;
    fertilizer.description = description || fertilizer.description;
    fertilizer.price = price || fertilizer.price;
    fertilizer.type = type || fertilizer.type;
    fertilizer.indication = indication || fertilizer.indication;
    fertilizer.img = img || fertilizer.img;
    
    const updatedFertilizer = await fertilizer.save();
    res.json(updatedFertilizer);
  } else {
    res.status(404);
    throw new Error("Fertilizer not found");
  }
});
export {
  getFertilizers,
  getFertilizerCount,
  getFertilizerById,
  createFertilizerReview,
  createFertilizer,
  deleteFertilizer,
  updateFertilizer
};
