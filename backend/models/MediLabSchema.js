import mongoose from "mongoose";

const MediLabSchema = new mongoose.Schema({
  Labid:{type:Number,required:true,unique:true},
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
  qualifications: {
    type: Array,
  },
  certificates: {
    type: Array,
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
},
{ timestamps: true }
);

export default mongoose.model("MediLab", MediLabSchema)
