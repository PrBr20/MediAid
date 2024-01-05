import {updateDoctor,
    deleteDoctor, 
    getAllDoctors, 
    getSingleDoctor, 
    addTimeSlot, 
    deleteTimeSlot,
    updateTimeSlot,
    getTimeSlotsById
} from '../Controllers/doctorController.js'
import express from 'express'

import { authenticate, restrict } from '../auth/verifyToken.js'

const router = express.Router({mergeParams: true})

router.get('/:id', authenticate, getSingleDoctor)
router.get('/', authenticate, getAllDoctors)
router.put('/:id', authenticate, restrict(['doctor', 'admin']), updateDoctor)
router.delete('/:id', authenticate, restrict(['doctor', 'admin']), deleteDoctor)

router.post('/timeslots', authenticate, restrict(['doctor']), addTimeSlot)
router.delete('/timeslots/:id', authenticate, restrict(['doctor']), deleteTimeSlot)
router.patch('/timeslots/:id', authenticate, restrict(['doctor']), updateTimeSlot)
router.get('/timeslots/:id', authenticate, getTimeSlotsById)

export default router