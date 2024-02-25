import mongoose from "mongoose";

const reviewTestSchema = new mongoose.Schema(
  {
    test: {
        type: mongoose.Types.ObjectId,
        ref: "Test",
        required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
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

export default mongoose.model("ReviewTest", reviewTestSchema);