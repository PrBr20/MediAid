import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    medicines: [
        {
            medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
            unit: { type: String, required: true },
            unitPrice: { type: Number, required: true },
            qty: { type: Number, required: true },
        }
    ],
    totalPrice: { type: Number, required: true },
    trxId: { type: String, required: true },
    status: { type: String }
}, 
{ timestamps: true })

export default mongoose.model("Order", OrderSchema)