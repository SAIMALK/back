import mongoose from "mongoose";

const seedSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    type:{
        type:[String],
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    usage:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        default:0,
    },
    crops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crop' }],

   
}, {timestamps:true});
const Seed =  mongoose.model('Seed',seedSchema);
export default Seed;