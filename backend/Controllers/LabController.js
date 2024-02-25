import MediLab from '../models/MediLabSchemaa.js'
import ReviewLab from '../models/ReviewLabSchema.js'
import LabSlot from '../models/LabSlot.js'
import Test_Appointment from '../models/Test_AppoinmentSchema.js'
import Test from '../models/TestSchema.js'
import { Int32, ObjectId } from "mongodb"
import { addDays } from '../helpers/datehelper.js'

export const updateLab = async(req, res) => {
    const id = req.params.id
    
    try {
        const updatedLab = await MediLab.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res.status(200).json({success: true, msg: "MediLab updated successfully", data: updatedLab})
    } catch(err) {
        res.status(500).json({success: false, msg: "MediLab update failed", error: err})
    }
}

export const deleteLab = async(req, res) => {
    const id = req.params.id
    
    try {
        await MediLab.findByIdAndDelete(id)
        res.status(200).json({success: true, msg: "MediLab deleted successfully"})
    } catch(err) {
        res.status(500).json({success: false, msg: "MediLab deletion failed", error: err})
    }
}

export const getSingleMediLab = async(req, res) => {
    const id = req.params.id
    // console.log("good")
    
    try {
        let foundMediLab = await MediLab.findById(id).select('-password')
        const MediReviewLabs = await ReviewLab.find({MediLab: id}).populate('user')
        
        let avgStars = 0
        for (let i = 0; i < MediReviewLabs.length; i++)
            avgStars += MediReviewLabs[i].rating
        if(MediReviewLabs.length > 0)    
            avgStars /= MediReviewLabs.length

        const currDate = new Date()
        const oid = new ObjectId(id)
        // const scount = await LabSlot.find({
        //     MediLab: oid,
        //     date: {$gte: currDate},
        // }).count()
        // const count = slots.length

        // const pcount = await Test_Appointment.find({
        //     MediLab: oid,
        // }).count()

        if(foundMediLab != null) {
            foundMediLab = foundMediLab.toObject()
            // MediLab = {...MediLab, averageStars: avgStars, slotCount: scount, patientCount: pcount}
            res.status(200).json({success: true, msg: "MediLab found", data: foundMediLab})
        }
        else
            res.status(404).json({success:false, msg: "MediLab not found", data: null})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "MediLab not found", error: err})
    }
}
export const getSingleMediLabTestbyId = async(req,res)=>{
    const id = req.params.id
    try {
     
        const query = req.query
        let Tests

        let obj = {}
       
        if(query.name) obj.name=query.name
        // if(query.Lab) obj.push({Lab:{$gte: query.Lab}})
        // if(query.specialization) obj.push({specialization: query.specialization})
        // if(query.feeLower) obj.push({fee: {$gte: query.feeLower}})
        // if(query.feeUpper) obj.push({fee: {$lte: query.feeUpper}})
        // if(query.rating) obj.push({avgStars: {$gte: query.rating}})
        
        if(obj.length > 0)
           Tests = await Test.find(obj)
        else
           Tests = await Test.find()
       
           
        let newtests = []

        for(let i=0;i<Tests.length;i++)
        {
            if(Test[i].Lab==id)
            {
                newtests.push(Test[i])
            }
        }
      

        
        res.status(200).json({success: true, msg: "Tests found", data: newtests})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Tests not found", error: err})
    }

}

export const searchMediLabs = async(req, res) => {
    try {
     
        const query = req.query
        let MediLabs

        let obj = []
        if(query.name) obj.push({name: { $regex: query.name, $options: "i" }})
        // if(query.specialization) obj.push({specialization: query.specialization})
        // if(query.feeLower) obj.push({fee: {$gte: query.feeLower}})
        // if(query.feeUpper) obj.push({fee: {$lte: query.feeUpper}})
        if(query.rating) obj.push({avgStars: {$gte: query.rating}})


        if(obj.length > 0)
            MediLabs = await MediLab.find({isApproved: "approved", $and: obj}).select('-password')
        else
            MediLabs = await MediLab.find({isApproved: "approved"}).select('-password')

        for(let i = 0; i < MediLabs.length; i++) {
            const currDate = new Date()
            const id = MediLabs[i]._id
            const scount = await LabSlot.find({
                MediLab: id,
                date: {$gte: currDate},
            }).count()

            MediLabs[i] = MediLabs[i].toObject()
            MediLabs[i] = {...MediLabs[i], averageStars: MediLabs[i].avgStars, slotCount: scount}
        }

        if(query.timerange != undefined && query.timerange != null) {
            let newMediLabs = []
            let currDate = new Date()
            currDate.setHours(0, 0, 0, 0)
            
            let finalDate
            if(query.timerange == "today")
                finalDate = addDays(currDate, 1)
            else if(query.timerange == "week")
                finalDate = addDays(currDate, 8)

            for(let i = 0; i < MediLabs.length; i++) {
                const MediLabSlots = await LabSlot.find({
                    MediLab: MediLabs[i]._id,
                    date: {$gte: currDate, $lt: finalDate}
                })
                if(MediLabSlots.length > 0)
                    newMediLabs.push(MediLabs[i])
            }

            MediLabs = newMediLabs
        }
        res.status(200).json({success: true, msg: "MediLabs found", data: MediLabs})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "MediLabs not found", error: err})
    }
}
export const searchTests = async(req, res) => {
    try {
     
        const query = req.query
        const id=query.mediLabId
        let Tests

        let obj = {}
       
        if(query.name) obj.name=query.name
        // if(query.Lab) obj.push({Lab:{$gte: query.Lab}})
        // if(query.specialization) obj.push({specialization: query.specialization})
        // if(query.feeLower) obj.push({fee: {$gte: query.feeLower}})
        // if(query.feeUpper) obj.push({fee: {$lte: query.feeUpper}})
        // if(query.rating) obj.push({avgStars: {$gte: query.rating}})


        if(obj.length > 0)
            Tests = await Test.find(obj)
        else
            Tests = await Test.find()
           
        let newtests = []

        for(let i=0;i<Tests.length;i++)
        {
            if(Tests[i].Lab==id)
            {
                newtests.push(Tests[i])
            }
        }
        
      

        
        res.status(200).json({success: true, msg: "Tests found", data: newtests})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Tests not found", error: err})
    }
}
export const addTest = async(req, res) => {
    const id = req.userId
    let {name,price,description,image} = req.body

    try {
        // slotDate = new Date(slotDate)
        // console.log(slotDate)
        // slotDate.setDate(slotDate.getDate() + 1)
        // slotDate.setHours(0, 0, 0)
        // console.log(slotDate)

        const newTest = new Test({
            Lab: id,
            price,
            name,
            description,
            image
        })
        newTest.save()
        res.status(200).json({success: true, msg: "Test added successfully", data: newTest})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Test addition failed", error: err})
    }
}

export const deleteTest = async(req, res) => {
    const remId = req.params.id

    try {
        LabSlot.findByIdAndDelete(remId)
        res.status(200).json({success: true, msg: "Time slot deleted successfully"})
    } catch(error) {
        console.log(error)
        res.status(500).json({success: false, msg: "Time slot deletion failed"})
    }
}

export const updateTest = async(req, res) => {
    const id = req.params.id
    try {
        const updatedSlot = LabSlot.findByIdAndUpdate(id, {$set: req.body}, {new: true})
        res.status(200).json({success: true, msg: "Time slot updated successfully", data: updatedSlot})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Time slot update failed"})
    }
}

export const getTestsById = async(req, res) => {
    let id = req.params.id
    id = new ObjectId(id)
    let date = new Date(req.query.date)
    date.setDate(date.getDate() + 1)
    // console.log(date)
    try {
        let obj = {
            MediLab: id
        }
        if(req.query.date != undefined && req.query.date != null)
            obj.date = date
        const slots = await LabSlot.find(obj).sort({date: -1})

        for(let i=0; i<slots.length; i++) {
            const appointments = await Test_Appointment.find({
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