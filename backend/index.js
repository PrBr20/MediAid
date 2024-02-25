import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

import authRoutes from "./Routes/auth.js"
import userRoutes from "./Routes/user.js"
import doctorRoutes from "./Routes/doctor.js"
import mediLabRoutes from "./Routes/mediLab.js"
import specializationRoutes from "./Routes/specialization.js"
import reviewRoutes from "./Routes/review.js"
import appointmentRoutes from "./Routes/appointment.js"
import prescriptionRoutes from "./Routes/prescription.js"
import medicineRoutes from "./Routes/medicine.js"
import infoRoutes from "./Routes/info.js"
import companyRoutes from "./Routes/company.js"
import cartRoutes from "./Routes/cart.js"
import reviewLabRoutes from "./Routes/reviewLab.js"
import reviewTestRoutes from "./Routes/reviewTest.js"
import testRoutes from "./Routes/test.js"

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
app.use("/api/mediLab", mediLabRoutes)
app.use("/api/specialization", specializationRoutes)
app.use("/api/review", reviewRoutes)
app.use("/api/appointment", appointmentRoutes)
app.use("/api/prescription", prescriptionRoutes)
app.use("/api/medicine", medicineRoutes)
app.use("/api/info", infoRoutes)
app.use("/api/company", companyRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/reviewLab",reviewLabRoutes)
app.use("/api/reviewTest",reviewTestRoutes)
app.use("/api/test",testRoutes)

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`)
})