import mongoose from "mongoose";

const test_appointment_schema = new mongoose.Schema(
  {
     lab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lab",
      required: true,
    },
    // TestId:{
    //     type:mongoose.Types.ObjectId,
    //     ref:"Test",
    //     required:true,
    // },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testPrice: { type: Number, required: true },

    slot: {
      type: mongoose.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    serial: {
      type: Number,
      required: true,
      default: -1,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "cancelled", "finished"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },

    prescription: {
        type:String,
    //   weight: { type: Number },
    //   prescribedMeds: [
    //     {
    //       medicineName: { type: String, required: true },
    //       category: { type: String },
    //       dosage: { type: String },
    //       details: { type: String },
    //       type: {type: String}
    //     }
    //   ],
    //   // appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    //   symptoms: [{ type: String }],
    //   diagnosis: [{ type: String }],
    //   advice: [{ type: String }],
    //   tests: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Test_Appointment", test_appointment_schema);
