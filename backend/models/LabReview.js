import mongoose from "mongoose";

const lab_reviewSchema = new mongoose.Schema(
  {
    lab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lab",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewText: {
      type: String,
      // required: true,
      default: "",
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lab_Review", lab_reviewSchema);
