import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const register = async(req, res) => {
    const {email, password, name, role, photo, gender, fee, specialization} = req.body
    
    try {
        let user = null

        if(role === 'patient')
            user = await User.findOne({email})
        else if(role === 'doctor')
            user = await Doctor.findOne({email})
        if(user)
            return res.status(400).json({success: false, msg: "User already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        if(role === 'patient') {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            })
        }

        else if(role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,
                fee,
                specialization
            })
        }

        await user.save()
        res.status(200).json({success:true, msg: "User registered successfully"})

    } catch(err) {
        console.log(err)
        res.status(500).json({success:false, msg: "Registration failed"})
    }
}

export const login = async(req, res) => {
    const {email} = req.body
    
    try {
        let user = null
        const patient = await User.findOne({email})
        const doctor = await Doctor.findOne({email})

        if(patient) user = patient
        else if(doctor) user = doctor
        else
            return res.status(404).json({success:false, msg: "User not found"})

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch)
            return res.status(404).json({success:false, msg: "Wrong password"})

        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn: "15d"})
        const {password, role, appointments, ...rest} = user._doc

        res.status(200).json({
            success:true,
            msg: "Login Successful",
            token,
            data: { ...rest },
            role
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({success:false, msg: "Login failed"})
    }
}