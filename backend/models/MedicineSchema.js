import mongoose from "mongoose"

const medicineSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: {type: String, required: true},
        category: { type: String, required: true},
        manufacturer: { type:mongoose.Schema.Types.ObjectId, ref: "Company", required: true},
        image: {type: String},
        overview: {type: String},
        avgStars: {type: Number, default: 0},
        reviewCount: {type: Number, default: 0},
        prices: [
            {
                unit: {type: String},
                amount: {type: Number},
            }
        ],
    }
)

export default mongoose.model("Medicine", medicineSchema)