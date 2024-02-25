import ReviewTest from "../models/ReviewTestSchema.js"
import Test from "../models/TestSchema.js"
import { ObjectId } from "mongodb"

const getTestReviews = async (testId) => {
    try {
        const testObjId = new ObjectId(testId)
        const reviews = await ReviewTest.find({ test: testObjId })
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
        const reviews = await ReviewTest.find({user: patientObjId}).populate('user', '-password')
        return reviews
    } catch (err) {
        console.log(err)
        return null
    }
}

export const getAllReviews = async (req, res) => {
    const testId = req.query.testId
    const patientId = req.userId
    // console.log("Doctor id in review: " + doctorId)
    // console.log("User id in review: " + patientId)
    try {
        let reviews
        if(testId != undefined && testId != null)
            reviews = await getTestReviews(testId)
        else
            reviews = await getPatientReviews(patientId)
        res.status(200).json({ success: true, msg: "Succesfully fetched reviews", data: reviews })
    } catch (err) {
        res.status(500).json({ success: false, msg: "Failed to fetch reviews", data: null})
    }
}

export const getAllReviewsPatient = async (req, res) => {
    try {
        const reviews = await ReviewTest.find()
        res.status(200).json({ success: true, msg: "Succesfully fetched reviews", data: reviews })
    } catch (err) {
        res.status(500).json({ success: false, msg: "Failed to fetch reviews", data: null})
    }
}

export const createReview = async (req, res) => {
    if(!req.body.user) req.body.user = req.userId
    const newReview = new ReviewTest(req.body)
    
    try {
        const savedReview = await newReview.save()

        const test = await Test.findOne({_id: newReview.test})
        test.reviewCount = test.reviewCount + 1
        if(test.reviewCount > 1)
              test.avgStars = (test.avgStars * (test.reviewCount - 1) + newReview.rating) / test.reviewCount
        else
               test.avgStars = newReview.rating
        await test.save()

        res.status(200).json({ success: true, msg: "Review submitted", data: savedReview })
    } catch(err) {
        res.status(500).json({ success: false, msg: "Failed to submit review", data: null })
    }
}

export const deleteReview = async (req, res) => {
    const reviewId = req.params.id
    try {
        const review = await ReviewTest.findOne({_id: reviewId})
        const test = await Test.findOne({_id: review.test})
        test.reviewCount = test.reviewCount - 1
        if(test.reviewCount > 0)
            test.avgStars = (test.avgStars * (test.reviewCount + 1) - review.rating) / test.reviewCount
        else
            test.avgStars = 0
        await test.save()
        await ReviewTest.findByIdAndDelete(reviewId)

        res.status(200).json({ success: true, msg: "Review deleted"})
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, msg: "Failed to delete review", data: null })
    }
}