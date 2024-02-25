import MediLab from '../models/MediLabSchemaa.js'
import ReviewTest from '../models/ReviewTestSchema.js'
// import LabSlot from '../models/LabSlot.js'
// import Test_Appointment from '../models/Test_AppoinmentSchema.js'
import Test from '../models/TestSchema.js'
import { Int32, ObjectId } from "mongodb"
import { addDays } from '../helpers/datehelper.js'
export const getSingleTest = async(req, res) => {
     const id = req.params.id
     console.log(id)
    // const query = req.query
    // const id=query.testId
    
    try {
        let test = await Test.findById(id)
        const testReviews = await ReviewTest.find({test: id}).populate('user')
        
        let avgStars = 0
        for (let i = 0; i < testReviews.length; i++)
            avgStars += testReviews[i].rating
        if(testReviews.length > 0)    
            avgStars /= testReviews.length

        // const currDate = new Date()
        // const oid = new ObjectId(id)
        // const scount = await Slot.find({
        //     doctor: oid,
        //     date: {$gte: currDate},
        // }).count()
        // const count = slots.length

        // const pcount = await Appointment.find({
        //     doctor: oid,
        // }).count()

        if(test != null) {
            test = test.toObject()
            // doctor = {...doctor, averageStars: avgStars, slotCount: scount, patientCount: pcount}
            test = {...test, averageStars: avgStars,patientCount: 0}
            res.status(200).json({success: true, msg: "test found", data: test})
        }
        else
            res.status(404).json({success:false, msg: "test not found", data: null})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "test not found", error: err})
    }
}