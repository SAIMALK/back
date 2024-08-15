import mongoose from "mongoose";


const pestSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    type:{
        type:Array,
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
const Pest =  mongoose.model('Pest',pestSchema);
export default Pest;