import Appointment from '../models/AppointmentSchema.js';
import Slot from '../models/SlotSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const addAppointment = async (req, res) => {
    const id = req.userId
    try {
        const data = req.body
        const appointment = new Appointment({
            doctor: data.doctor,
            user: id,
            ticketPrice: data.ticketPrice,
            slot: data.timeSlot,
        })

        const allAppointments = await Appointment.find({doctor: appointment.doctor, slot: appointment.slot})
        appointment.serial = 1
        for(let i = 0; i < allAppointments.length; i++) {
            if(allAppointments[i].status != "cancelled")
                appointment.serial = appointment.serial + 1
        }
        appointment.status = "approved"
        await appointment.save()

        const slot = await Slot.findOne({_id: appointment.slot})
        slot.occupied = slot.occupied + 1
        await slot.save()

        const doctor = await Doctor.findOne({_id: appointment.doctor})
        doctor.patientCount = doctor.patientCount + 1
        await doctor.save()

        res.status(200).json({success: true, msg: "Appointment added succesfully", appointment})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Couldn't add appointment"})
    }
}

export const getAppointments = async (req, res) => {
    const id = req.userId
    const role = req.role
    try {
        let appointments
        if (role === 'patient')
            appointments = await Appointment.find({user: id}).populate('doctor', '-password').populate('slot')
        else if (role === 'doctor')
            appointments = await Appointment.find({doctor: id}).populate('user', '-password').populate('slot')
        else
            res.status(401).json({success: false, msg: "Unauthorized"})
        res.status(200).json({success: true, appointments})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Couldn't fetch appointments"})
    }
}

export const approveAppointment = async (req, res) => {
    const id = req.params.id
    try {
        const appointment = await Appointment.findOne({_id: id})

        if(appointment.status == "cancelled")
            return res.status(200).json({success: false, msg: "Appointment cancelled by patient"})

        if(appointment.status == "approved")
            return res.status(200).json({success: true, msg: "Appointment approved successfully", data: appointment})

        const allAppointments = await Appointment.find({doctor: appointment.doctor, slot: appointment.slot})
        appointment.serial = 1
        for(let i = 0; i < allAppointments.length; i++) {
            if(allAppointments[i].status == "approved")
                appointment.serial = allAppointments[i].serial + 1
        }
        appointment.status = "approved"
        await appointment.save()
        return res.status(200).json({success: true, msg: "Appointment approved successfully", data: appointment})
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Couldn't approve appointment"})
    }
}

export const getCombo = async (req, res) => {
    const doctorId = req.query.doctorId
    const patientId = req.query.patientId
    try {
        const appointments = await Appointment.find({doctor: doctorId, user: patientId}).populate('slot')
        res.status(200).json({success: true, msg: "Appointments found", data: appointments})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Couldn't fetch appointments"})
    }
}

export const finishAppointment = async (req, res) => {
    const appointmentId = req.params.id
    try {
        const appointment = await Appointment.findOne({_id: appointmentId})
        appointment.status = "finished"
        await appointment.save()

        const slot = await Slot.findOne({_id: appointment.slot})
        slot.done = slot.done + 1
        await slot.save()

        res.status(200).json({success: true, msg: "Appointment finished successfully"})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Couldn't finish appointment"})
    }
}

export const getDoctorGroup = async (req, res) => {
    const doctorId = req.params.id
    const group = req.query.group
    const date = new Date(req.query.date)

    date.setDate(date.getDate() + 1)
    date.setHours(0, 0, 0, 0)

    try {
        let query = {doctor: doctorId}
        if(group == "current")
            query.date = date
        else if(group == "upcoming")
            query.date = {$gt: date}
        else if(group == "past") {
            query.date = {$lt: date}
            query.status = "finished"
        }

        let slots = await Slot.find(query).sort({date: -1})
        for(let i = 0; i < slots.length; i++) {
            let appointments = await Appointment.find({slot: slots[i]._id}).populate('user', '-password').sort({serial: 1})
            slots[i] = slots[i].toObject()
            slots[i] = {...slots[i], appointments}
        }

        res.status(200).json({success: true, msg: "Appointments found", data: slots})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Couldn't fetch appointments"})
    }
}

export const getPatientGroup = async (req, res) => {
    const patientId = req.params.id
    const group = req.query.group
    const date = new Date(req.query.date)

    date.setDate(date.getDate() + 1)
    date.setHours(0, 0, 0, 0)

    try {
        let appointments = await Appointment.find({user: patientId}).populate('slot')
                                            .populate('doctor', '-password').populate('user', '-password')
        if(group == "current")
            appointments = appointments.filter(appointment => appointment.slot.date.getTime() == date.getTime())
        else if(group == "upcoming")
            appointments = appointments.filter(appointment => appointment.slot.date.getTime() > date.getTime())
        else if(group == "past") {
            appointments = appointments.filter(appointment => appointment.slot.date.getTime() < date.getTime())
            appointments = appointments.filter(appointment => appointment.status == "finished")
        }

        appointments = appointments.sort((a, b) => b.slot.date - a.slot.date)
        res.status(200).json({success: true, msg: "Appointments found", data: appointments})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Couldn't fetch appointments"})
    }
}