import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    name: { type: String, required: true },
    phone: { type: String },
    photo: { type: String },
    role: { type: String, default: "company" },
});

export default mongoose.model("Company", CompanySchema);