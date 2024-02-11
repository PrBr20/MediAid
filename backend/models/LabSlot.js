import mongoose from "mongoose"

const Lab_SlotSchema = new mongoose.Schema({
    lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lab"
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
    }
},
{ timestamps: true }
)

export default mongoose.model("LabSlot", Lab_SlotSchema)