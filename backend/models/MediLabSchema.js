import mongoose from "mongoose";

const MediLabSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: {
    type: String,
  },
  gender: { type: String, enum: ["male", "female", "other"] },

  // Fields for doctors only
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialization",
  },
  qualifications: {
    type: Array,
  },
  certificates: {
    type: Array,
  },

  experiences: {
    type: Array,
  },

  bio: { type: String, maxLength: 50 },
  about: { type: String },
  fee: {type: Number},
  
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "approved", //TODO: Change to pending
  },
},
{ timestamps: true }
);

export default mongoose.model("Doctor", DoctorSchema)
