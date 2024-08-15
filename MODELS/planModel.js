import mongoose from "mongoose";

const cropPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add user reference
  crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
  landSize: Number,
  startDate: Date,
  labourCost: Number,
  seedName: String,
  marketDistance: Number,
  createdAt: { type: Date, default: Date.now }
});

// When fetching the plan, populate the crop name and image
cropPlanSchema.virtual('cropDetails', {
  ref: 'Crop',
  localField: 'crop',
  foreignField: '_id',
  justOne: true,
  select: 'name img durationInMonths' // Only fetch the name and image fields
});

const CropPlan = mongoose.model('CropPlan', cropPlanSchema);

export default CropPlan;
