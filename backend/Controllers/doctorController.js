import Doctor from '../models/DoctorSchema.js'
import Review from '../models/ReviewSchema.js'
import Slot from '../models/SlotSchema.js'
import Appointment from '../models/AppointmentSchema.js'
import { Int32, ObjectId } from "mongodb"
import { addDays } from '../helpers/datehelper.js'

export const updateDoctor = async(req, res) => {
    const id = req.params.id
    
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res.status(200).json({success: true, msg: "Doctor updated successfully", data: updatedDoctor})
    } catch(err) {
        res.status(500).json({success: false, msg: "Doctor update failed", error: err})
    }
}

export const deleteDoctor = async(req, res) => {
    const id = req.params.id
    
    try {
        await Doctor.findByIdAndDelete(id)
        res.status(200).json({success: true, msg: "Doctor deleted successfully"})
    } catch(err) {
        res.status(500).json({success: false, msg: "Doctor deletion failed", error: err})
    }
}

export const getSingleDoctor = async(req, res) => {
    const id = req.params.id
    
    try {
        let doctor = await Doctor.findById(id).select('-password').populate('specialization')
        const doctorReviews = await Review.find({doctor: id}).populate('user')
        
        let avgStars = 0
        for (let i = 0; i < doctorReviews.length; i++)
            avgStars += doctorReviews[i].rating
        if(doctorReviews.length > 0)    
            avgStars /= doctorReviews.length

        const currDate = new Date()
        const oid = new ObjectId(id)
        const scount = await Slot.find({
            doctor: oid,
            date: {$gte: currDate},
        }).count()
        // const count = slots.length

        const pcount = await Appointment.find({
            doctor: oid,
        }).count()

        if(doctor != null) {
            doctor = doctor.toObject()
            doctor = {...doctor, averageStars: avgStars, slotCount: scount, patientCount: pcount}
            res.status(200).json({success: true, msg: "Doctor found", data: doctor})
        }
        else
            res.status(404).json({success:false, msg: "Doctor not found", data: null})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Doctor not found", error: err})
    }
}

export const searchDoctors = async(req, res) => {
    try {
        const query = req.query
        let doctors

        if(query.name != undefined && query.name != null) {
            doctors = await Doctor.find({
                isApproved: "approved",
                name: { $regex: query.name, $options: "i" }
            }).select('-password').populate('specialization')
        }
        else
            doctors = await Doctor.find({isApproved: "approved"}).select('-password').populate('specialization')
        // console.log(doctors)

        if(query.specialization != undefined && query.specialization != null) {
            const specId = new ObjectId(query.specialization)
            doctors = doctors.filter(doctor => doctor.specialization._id.equals(specId))
        }

        if(query.feeLower != undefined && query.feeLower != null) {
            const feeLower = query.feeLower
            doctors = doctors.filter(doctor => doctor.fee >= feeLower)
        }

        if(query.feeUpper != undefined && query.feeUpper != null) {
            const feeUpper = query.feeUpper
            doctors = doctors.filter(doctor => doctor.fee <= feeUpper)
        }

        for(let i = 0; i < doctors.length; i++) {
            const doctorReviews = await Review.find({doctor: doctors[i]._id}).populate('user')
            let avgStars = 0
            for (let i = 0; i < doctorReviews.length; i++)
                avgStars += doctorReviews[i].rating
            if(doctorReviews.length > 0)
                avgStars /= doctorReviews.length

            const currDate = new Date()
            const id = doctors[i]._id
            const scount = await Slot.find({
                doctor: id,
                date: {$gte: currDate},
            }).count()
            // const count = slots.length

            const pcount = await Appointment.find({
                doctor: id,
            }).count()

            doctors[i] = doctors[i].toObject()
            doctors[i] = {...doctors[i], averageStars: avgStars, slotCount: scount, patientCount: pcount}
        }

        if(query.rating != undefined && query.rating != null) {
            const rating = 1.00 * query.rating
            doctors = doctors.filter(doctor => doctor.averageStars >= rating)
        }

        if(query.timerange != undefined && query.timerange != null) {
            let newDoctors = []
            let currDate = new Date()
            currDate.setHours(0, 0, 0, 0)
            
            let finalDate
            if(query.timerange == "today")
                finalDate = addDays(currDate, 1)
            else if(query.timerange == "week")
                finalDate = addDays(currDate, 8)

            for(let i = 0; i < doctors.length; i++) {
                const doctorSlots = await Slot.find({
                    doctor: doctors[i]._id,
                    date: {$gte: currDate, $lt: finalDate}
                })
                if(doctorSlots.length > 0)
                    newDoctors.push(doctors[i])
            }

            doctors = newDoctors
        }

        res.status(200).json({success: true, msg: "Doctors found", data: doctors})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Doctors not found", error: err})
    }
}

export const addTimeSlot = async(req, res) => {
    const id = req.userId
    let {starthr, endhr, startmin, endmin, slotDate, patientCount} = req.body
    console.log(slotDate)

    try {
        slotDate = new Date(slotDate)
        console.log(slotDate)
        slotDate.setDate(slotDate.getDate() + 1)
        slotDate.setHours(0, 0, 0)
        console.log(slotDate)

        const newSlot = new Slot({
            doctor: id,
            starthr, 
            endhr, 
            startmin, 
            endmin, 
            date: slotDate,
            patientCount
        })
        newSlot.save()
        res.status(200).json({success: true, msg: "Time slot added successfully", data: newSlot})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Time slot addition failed", error: err})
    }
}

export const deleteTimeSlot = async(req, res) => {
    const remId = req.params.id

    try {
        Slot.findByIdAndDelete(remId)
        res.status(200).json({success: true, msg: "Time slot deleted successfully"})
    } catch(error) {
        console.log(error)
        res.status(500).json({success: false, msg: "Time slot deletion failed"})
    }
}

export const updateTimeSlot = async(req, res) => {
    const id = req.params.id
    try {
        const updatedSlot = Slot.findByIdAndUpdate(id, {$set: req.body}, {new: true})
        res.status(200).json({success: true, msg: "Time slot updated successfully", data: updatedSlot})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Time slot update failed"})
    }
}

export const getTimeSlotsById = async(req, res) => {
    let id = req.params.id
    id = new ObjectId(id)
    try {
        const currDate = new Date()
        const slots = await Slot.find({
            doctor: id,
            // date: {$gte: currDate}
        }).sort({date: -1})

        for(let i=0; i<slots.length; i++) {
            const appointments = await Appointment.find({
                slot: slots[i]._id,
                status: "approved"
            })
            slots[i] = slots[i].toObject()
            slots[i] = {...slots[i], appointments}
        }

        res.status(200).json({success: true, msg: "Time slots fetched successfully", data: slots})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Time slot fetch failed"})
    }
}