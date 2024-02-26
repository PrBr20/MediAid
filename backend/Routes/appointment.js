import express from 'express'
import { authenticate, restrict } from '../auth/verifyToken.js'
import {addAppointment,
    getAppointments, 
    approveAppointment, 
    getCombo, 
    finishAppointment,
    getDoctorGroup,
    getPatientGroup,
    getTestGroup,
    addTestAppointment,
    getTestAppointments,
    approveTestAppointment,
    finishTestAppointment,


} from '../Controllers/appointmentController.js'

const router = express.Router({mergeParams: true})

router.put('/', authenticate, restrict(['patient']), addAppointment)
router.get('/', authenticate, restrict(['patient', 'doctor']), getAppointments)
router.patch('/:id', authenticate, restrict(['doctor']), approveAppointment)

router.put('/test', authenticate, restrict(['patient']), addTestAppointment)
router.get('/test', authenticate, restrict(['patient', 'mediLab']), getTestAppointments)
router.patch('/test/:id', authenticate, restrict(['mediLab']), approveTestAppointment)
router.get('/combo', authenticate, getCombo)

router.post('/finish/:id', authenticate, restrict(['doctor']), finishAppointment)
router.post('/test/finish/:id', authenticate, restrict(['mediLab']), finishTestAppointment)

router.get('/doctor/:id', getDoctorGroup)
router.get('/patient/:id', getPatientGroup)
router.get('/test/:id',getTestGroup)

export default router