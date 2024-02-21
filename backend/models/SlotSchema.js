import mongoose from "mongoose"

const SlotSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },

    starthr: Number, 
    startmin: Number, 
    endhr: Number, 
    endmin: Number, 
    date: Date,
    patientCount: {
        type: Number,
        default: 1
    },
    occupied: {
        type: Number,
        default: 0
    },
    done: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        default: ""
    }
},
{ timestamps: true }
)

export default mongoose.model("Slot", SlotSchema)