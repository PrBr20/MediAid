import mongoose from "mongoose"

const testSchema = new mongoose.Schema(
    {
        // Labid: { type: Number, required: true },
        // TestId:{type:Number,required:true,unique:true},
        Lab: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MediLab",
            required: true
            
        },
        LabName:{type:String},
        price: {type:Number , required:true},
        name: { type: String, required: true },
        description : { type: String},
        image: {type: String},
        avgStars: { type: Number, default: 0 },
        reviewCount: { type: Number, default: 0 },
        patientCount: { type: Number, default: 0 },
        
    }
)

export default mongoose.model("Test", testSchema)