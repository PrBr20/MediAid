import mongoose from "mongoose"

const testSchema = new mongoose.Schema(
    {
        // Labid: { type: Number, required: true },
        // TestId:{type:Number,required:true,unique:true},
        Lab: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lab"
        },
        price: {type:Number , required:true},
        name: { type: String, required: true },
        description : { type: String},
        image: {type: String},
        
    }
)

export default mongoose.model("Test", testSchema)