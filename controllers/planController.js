import asyncHandler from "../middleware/asyncHandler.js";
import Plan from "../MODELS/planModel.js";
import Crop from "../MODELS/cropModel.js";

// @desc    Create a new crop plan
// @route   POST /api/plans
// @access  Private
const createPlan = asyncHandler(async (req, res) => {
  const { cropId, landSize, startDate, labourCost, seedName, marketDistance } = req.body;
  const userId = req.user._id; // Assuming user authentication middleware sets req.user

  const crop = await Crop.findById(cropId);
  
  if (!crop) {
    res.status(404);
    throw new Error("Crop not found");
  }

  const plan = new Plan({
    userId,
    crop: cropId,
    landSize,
    startDate,
    labourCost,
    seedName,
    marketDistance,
  });

  const createdPlan = await plan.save();
  res.status(201).json(createdPlan);
});

// @desc    Fetch all plans
// @route   GET /api/plans
// @access  Private
const getPlans = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming user authentication middleware sets req.user

  const plans = await Plan.find({ userId }).populate('crop', 'name img durationInMonths');
  res.json(plans);
});

// @desc    Fetch a plan by ID
// @route   GET /api/plans/:id
// @access  Private
const getPlanById = asyncHandler(async (req, res) => {
    const plan = await Plan.findById(req.params.id).populate('crop', 'name img durationInMonths');
    
    if (plan) {
      res.json(plan);
    } else {
      res.status(404);
      throw new Error("Plan not found");
    }
  });
// @desc    Update a plan
// @route   PUT /api/plans/:id
// @access  Private
const updatePlan = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming user authentication middleware sets req.user
  const { landSize, startDate, labourCost, seedName, marketDistance } = req.body;

  const plan = await Plan.findOne({ _id: req.params.id, userId });

  if (plan) {
    plan.landSize = landSize || plan.landSize;
    plan.startDate = startDate || plan.startDate;
    plan.labourCost = labourCost || plan.labourCost;
    plan.seedName = seedName || plan.seedName;
    plan.marketDistance = marketDistance || plan.marketDistance;

    const updatedPlan = await plan.save();
    res.json(updatedPlan);
  } else {
    res.status(404);
    throw new Error("Plan not found");
  }
});

// @desc    Delete a plan
// @route   DELETE /api/plans/:id
// @access  Private
const deletePlan = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming user authentication middleware sets req.user

  const plan = await Plan.findOne({ _id: req.params.id, userId });

  if (plan) {
    await Plan.deleteOne({ _id: plan._id });
    res.json({ message: "Plan removed" });
  } else {
    res.status(404);
    throw new Error("Plan not found");
  }
});

// @desc    Fetch plans by crop ID
// @route   GET /api/plans/crop/:cropId
// @access  Private
const getPlansByCropId = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming user authentication middleware sets req.user
  const cropId = req.params.cropId;

  const plans = await Plan.find({ crop: cropId, userId }).populate('crop', 'name img durationInMonths');
  res.json(plans);
});

export {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
  getPlansByCropId,
};
