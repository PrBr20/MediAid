import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

import authRoutes from "./Routes/auth.js"
import userRoutes from "./Routes/user.js"
import doctorRoutes from "./Routes/doctor.js"
import specializationRoutes from "./Routes/specialization.js"
import reviewRoutes from "./Routes/review.js"
import appointmentRoutes from "./Routes/appointment.js"
import prescriptionRoutes from "./Routes/prescription.js"
import medicineRoutes from "./Routes/medicine.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const hello = process.env.PORT

// Change later
const corsOptions = {
    origin: true
}

mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ignoreUndefined: true
        })
        console.log("MongoDB connected")
    } catch (err) {
        console.log("Failed to connect to MongoDB")
        console.log(err)
    }
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/doctor", doctorRoutes)
app.use("/api/specialization", specializationRoutes)
app.use("/api/review", reviewRoutes)
app.use("/api/appointment", appointmentRoutes)
app.use("/api/prescription", prescriptionRoutes)
app.use("/api/medicine", medicineRoutes)

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`)
})