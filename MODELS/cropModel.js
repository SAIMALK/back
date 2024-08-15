import mongoose from "mongoose";

const reviewSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    comment:{
        type:String,
        required:true,
    },
},{timestamps:true})

const cropSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    name:{
        type:String,
        required:true,
    },
    fertilizers:[{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Fertilizer',
    }],
    seeds:[{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Seed',
    }],
    season:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    durationPeriod:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    durationInMonths:{
        type:Number,
        required:true,
    },
    pests:[{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Pest',
    }],
    reviews:[reviewSchema],
    avgProfit:{
        type:Number,
        required:true,
        default:0,
    },
    
   
}, {timestamps:true});
const Crop =  mongoose.model('Crop',cropSchema);
export default Crop;