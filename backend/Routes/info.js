import express from 'express'
import { authenticate, restrict } from '../auth/verifyToken.js'
import {
    getDoctorDashboard,
    getPatientDashboard
} from '../Controllers/infoController.js'
const router = express.Router({mergeParams: true})

export default router

router.get('/dashboard/doctor/:id', getDoctorDashboard)
router.get('/dashboard/patient/:id', getPatientDashboard)