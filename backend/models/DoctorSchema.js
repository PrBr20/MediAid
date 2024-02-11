import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  photo: { type: String },
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

  avgStars: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  patientCount: { type: Number, default: 0 },
},
{ timestamps: true }
);

export default mongoose.model("Doctor", DoctorSchema)
