import mongoose from "mongoose"

const medicineSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: {type: String, required: true},
        category: { type: String, required: true},
        manufacturer: {type: String, required: true},
        image: {type: String},
        overview: {type: String}
    }
)

export default mongoose.model("Medicine", medicineSchema)