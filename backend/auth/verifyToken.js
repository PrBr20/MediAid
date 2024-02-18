import jwt from 'jsonwebtoken'
import Doctor from '../models/DoctorSchema.js'
import MediLab from '../models/MediLabSchemaa.js'
import User from '../models/UserSchema.js'

export const authenticate = async(req, res, next) => {
    const authToken = req.headers.authorization
    if(!authToken || !authToken.startsWith('Bearer '))
        return res.status(401).json({success: false, msg: "Unauthorized"})

    try {
        const token = authToken.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.id
        req.role = decoded.role
        next()
    } catch(err) {
        if(err.name === 'TokenExpiredError')
            return res.status(401).json({success: false, msg: "Token Expired", error: err})
        else
            res.status(500).json({success: false, msg: "Invalid Token", error: err})
    }
}

export const restrict = roles => async(req, res, next) => {
    const userId = req.userId
    let user

    const patient = await User.findById(userId)
    const doctor = await Doctor.findById(userId)
    const mediLab = await MediLab.findById(userId)

    if(patient)
        user = patient
    else if(doctor)
        user = doctor
    else if(mediLab)
        user = mediLab

    if(!roles.includes(user.role))
        return res.status(401).json({success: false, msg: "Unauthorized, in restrict function"})

    next()
}