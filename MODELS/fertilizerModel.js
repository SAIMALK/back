import mongoose from "mongoose";


const fertilizerSchema = new mongoose.Schema({
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
    indication:{
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
const Fertilizer =  mongoose.model('Fertilizer',fertilizerSchema);
export default Fertilizer;