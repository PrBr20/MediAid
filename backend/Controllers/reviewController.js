import Review from "../models/ReviewSchema.js"
import Doctor from "../models/DoctorSchema.js"
import { ObjectId } from "mongodb"

const getDoctorReviews = async (doctorId) => {
    try {
        const doctorObjId = new ObjectId(doctorId)
        const reviews = await Review.find({ doctor: doctorObjId }).populate('user', '-password')
        // console.log(reviews)
        return reviews
    } catch (err) {
        console.log(err)
        return null
    }
}

const getPatientReviews = async(patientId) => {
    try {
        const patientObjId = new ObjectId(patientId)
        const reviews = await Review.find({user: patientObjId}).populate('user', '-password')
        return reviews
    } catch (err) {
        console.log(err)
        return null
    }
}

export const getAllReviews = async (req, res) => {
    const doctorId = req.query.doctorId
    const patientId = req.userId
    // console.log("Doctor id in review: " + doctorId)
    // console.log("User id in review: " + patientId)
    try {
        let reviews
        if(doctorId != undefined && doctorId != null)
            reviews = await getDoctorReviews(doctorId)
        else
            reviews = await getPatientReviews(patientId)
        res.status(200).json({ success: true, msg: "Succesfully fetched reviews", data: reviews })
    } catch (err) {
        res.status(500).json({ success: false, msg: "Failed to fetch reviews", data: null})
    }
}

export const getAllReviewsPatient = async (req, res) => {
    try {
        const reviews = await Review.find()
        res.status(200).json({ success: true, msg: "Succesfully fetched reviews", data: reviews })
    } catch (err) {
        res.status(500).json({ success: false, msg: "Failed to fetch reviews", data: null})
    }
}

export const createReview = async (req, res) => {
    if(!req.body.user) req.body.user = req.userId
    const newReview = new Review(req.body)
    
    try {
        const savedReview = await newReview.save()

        const doctor = await Doctor.findOne({_id: newReview.doctor})
        doctor.reviewCount = doctor.reviewCount + 1
        if(doctor.reviewCount > 1)
            doctor.avgStars = (doctor.avgStars * (doctor.reviewCount - 1) + newReview.rating) / doctor.reviewCount
        else
            doctor.avgStars = newReview.rating
        await doctor.save()

        res.status(200).json({ success: true, msg: "Review submitted", data: savedReview })
    } catch(err) {
        res.status(500).json({ success: false, msg: "Failed to submit review", data: null })
    }
}

export const deleteReview = async (req, res) => {
    const reviewId = req.params.id
    try {
        const review = await Review.findOne({_id: reviewId})
        const doctor = await Doctor.findOne({_id: review.doctor})
        doctor.reviewCount = doctor.reviewCount - 1
        if(doctor.reviewCount > 0)
            doctor.avgStars = (doctor.avgStars * (doctor.reviewCount + 1) - review.rating) / doctor.reviewCount
        else
            doctor.avgStars = 0
        await doctor.save()
        await Review.findByIdAndDelete(reviewId)

        res.status(200).json({ success: true, msg: "Review deleted"})
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, msg: "Failed to delete review", data: null })
    }
}