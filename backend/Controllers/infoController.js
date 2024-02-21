import Doctor from "../models/DoctorSchema.js";
import Appointment from "../models/AppointmentSchema.js";

export const getDoctorDashboard = async (req, res) => {
    const doctorId = req.params.id
    try {
        const appointmentCount = await Appointment.countDocuments({ doctor: doctorId })
        const doctor = await Doctor.findOne({_id: doctorId})
        const data = {
            patientCount: appointmentCount,
            joinDate: doctor.createdAt,
            avgStars: doctor.avgStars,
            reviewCount: doctor.reviewCount,
            fee: doctor.fee
        }
        res.status(200).json({success: true, data})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal Server Error"})
    }
}

export const getPatientDashboard = async (req, res) => {
    const patientId = req.params.id
    try {
        res.status(200).json({success: true})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal Server Error"})
    }
}