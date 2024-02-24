import Appointment from '../models/AppointmentSchema.js';

export const addPrescription = async (req, res) => {
    const id = req.params.appointmentId
    // console.log(id)
    try {
        const appointment = await Appointment.findOne({_id: id})
        // console.log(appointment)
        const data = req.body
        appointment.prescription = {
            weight: data.weight,
            prescribedMeds: data.prescribedMeds,
            symptoms: data.symptoms,
            diagnosis: data.diagnosis,
            advice: data.advice,
            tests: data.tests
        }
        appointment.status = "finished"
        await appointment.save()
        res.status(200).json({success: true, msg: "Prescription added successfully", data: appointment})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Couldn't add prescription"})
    }
}

export const deletePrescription = async (req, res) => {
    const id = req.params.appointmentId
    try {
        const appointment = await Appointment.findOne({_id: id})
        appointment.prescription = null
        await appointment.save()
        res.status(200).json({success: true, msg: "Prescription deleted successfully", data: appointment})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Couldn't delete prescription"})
    }
}