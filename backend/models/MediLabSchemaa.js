import mongoose from "mongoose";

const MediLabSchemaa = new mongoose.Schema({

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: {
    type: String,
  },


  // Fields for Lab only
  tests: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tests",
  },

  certificates: {
    type: Array,
  },
  address:{
    type: String
  },

  experiences: {
    type: Array,
  },

  about: { type: String },
  
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

export default mongoose.model("MediLab", MediLabSchemaa)
