import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true},
    medicines: [
        {
            medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
            unit: { type: String, required: true },
            unitPrice: { type: Number, required: true },
            qty: { type: Number, required: true },
        }
    ],
    totalPrice: { type: Number, required: true },
}, 
{ timestamps: true })

export default mongoose.model("Cart", CartSchema)