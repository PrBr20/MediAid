import Medicine from "../models/MedicineSchema.js"
import Appointment from "../models/AppointmentSchema.js"
import MedReview from "../models/MedReviewSchema.js"

export const createNewMedicine = async (req, res) => {
    const newMedicine = new Medicine(req.body)

    try {
        const savedMedicine = await newMedicine.save()
        res.status(200).json({success: true, data: savedMedicine})
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal Server Error"})
    }
}

export const searchMedicine = async (req, res) => {
    let name = req.query.name
    let category = req.query.category
    let type = req.query.type
    let manufacturer = req.query.manufacturer

    try {
        const obj = []
        if (name) obj.push({name: {$regex: name, $options: "i"}})
        if (category) obj.push({category: {$regex: category, $options: "i"}})
        if (type) obj.push({type: {$regex: type, $options: "i"}})
        if (manufacturer) obj.push({manufacturer: {$regex: manufacturer, $options: "i"}})

        let medicine = null
        if (obj.length == 0) medicine = await Medicine.find()
        else medicine = await Medicine.find({ $and: obj })
        res.status(200).json({success: true, data: medicine})
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal Server Error"})
    }
}

export const prescriptionSearch = async (req, res) => {
    const apptID = req.query.apptid
    try {
        const appt = await Appointment.findOne({_id: apptID})
        const meds = appt.prescription.prescribedMeds
        const results = []
        for( let i = 0; i < meds.length; i++) {
            let curr = await Medicine.findOne({name: meds[i].medicineName})
            results.push(curr)
        }
        console.log(results)
        res.status(200).json({success: true, data: results})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal Server Error"})
    }
}

export const createReview = async (req, res) => {
    const medid = req.params.medid
    const user = req.userId
    const reviewText = req.body.reviewText
    const rating = req.body.rating
    // console.log(medid)
    // console.log(user)
    // console.log(reviewText)
    // console.log(rating)

    try {
        const newReview = new MedReview({
            medicine: medid,
            user: user,
            reviewText: reviewText,
            rating: rating
        })
        await newReview.save()
        // console.log(newReview)

        const medicine = await Medicine.findOne({_id: medid})
        let avg = medicine.avgStars
        let count = medicine.reviewCount
        let newAvg = (avg * count + rating) / (count + 1)
        count += 1
        medicine.avgStars = newAvg
        medicine.reviewCount = count
        await medicine.save()

        res.status(200).json({success: true, data: newReview})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal Server Error"})
    }
}

export const deleteReview = async (req, res) => {
    const revid = req.params.revid
    try {
        const review = await MedReview.findOne({_id: revid})
        const medid = review.medicine
        const rating = review.rating

        const medicine = await Medicine.findOne({_id: medid})
        let avg = medicine.avgStars
        let count = medicine.reviewCount
        
        let newAvg = 0
        if(count > 1) newAvg = (avg * count - rating) / (count - 1)
        else newAvg = 0
        count -= 1
        
        medicine.avgStars = newAvg
        medicine.reviewCount = count
        await medicine.save()
        await MedReview.deleteOne({_id: revid})
        res.status(200).json({success: true, msg: "Review Deleted"})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal Server Error"})
    }
}

export const fetchReviews = async (req, res) => {
    const medid = req.query.medid
    const user = req.query.user
    let obj = []
    if(medid) obj.push({medicine: medid})
    if(user) obj.push({user: user})

    try {
        let reviews = null
        if(obj.length == 0) reviews = await MedReview.find().populate('user')
        else reviews = await MedReview.find({$and: obj}).populate('user')
        res.status(200).json({success: true, data: reviews})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal Server Error"})
    }
}

export const fetchOneMedicine = async (req, res) => {
    const id = req.params.id
    try {
        const medicine = await Medicine.findOne({_id: id})
        res.status(200).json({success: true, data: medicine})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal Server Error"})
    }
}