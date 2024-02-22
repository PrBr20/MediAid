import Review from "../models/ReviewSchema.js"
import MediLab from "../models/MediLabSchemaa.js"
import { ObjectId } from "mongodb"

const getMediLabReviews = async (mediLabID) => {
    try {
        const mediLabObjId = new ObjectId(mediLabID)
        const reviews = await Review.find({ MediLab: mediLabObjId }).populate('user', '-password')
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
    const mediLabID = req.query.mediLabID
    const patientId = req.userId
    // console.log("Doctor id in review: " + doctorId)
    // console.log("User id in review: " + patientId)
    try {
        let reviews
        if(mediLabID != undefined && mediLabID != null)
            reviews = await getMediLabReviews(mediLabID)
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

        const mediLab = await MediLab.findOne({_id: newReview.mediLab})
        mediLab.reviewCount = mediLab.reviewCount + 1
        if(mediLab.reviewCount > 1)
            mediLab.avgStars = (mediLab.avgStars * (mediLab.reviewCount - 1) + newReview.rating) / mediLab.reviewCount
        else
            mediLab.avgStars = newReview.rating
        await mediLab.save()

        res.status(200).json({ success: true, msg: "Review submitted", data: savedReview })
    } catch(err) {
        res.status(500).json({ success: false, msg: "Failed to submit review", data: null })
    }
}

export const deleteReview = async (req, res) => {
    const reviewId = req.params.id
    try {
        const review = await Review.findOne({_id: reviewId})
        const mediLab = await mediLab.findOne({_id: review.mediLab})
        mediLab.reviewCount = mediLab.reviewCount - 1
        if(mediLab.reviewCount > 0)
            mediLab.avgStars = (mediLab.avgStars * (mediLab.reviewCount + 1) - review.rating) / mediLab.reviewCount
        else
            mediLab.avgStars = 0
        await mediLab.save()
        await Review.findByIdAndDelete(reviewId)

        res.status(200).json({ success: true, msg: "Review deleted"})
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, msg: "Failed to delete review", data: null })
    }
}