import{
    updateLab,
    searchMediLabs,
    getSingleMediLab,
    deleteTimeSlot,
    updateTimeSlot,
    getTimeSlotsById,
    deleteLab,
    addTest
}from '../Controllers/LabController.js'
import express from 'express'
import { authenticate,restrict } from '../auth/verifyToken.js'

const router = express.Router({mergeParams: true})
router.get('/fetch/:id', authenticate, getSingleMediLab)
router.get('/search', authenticate, searchMediLabs)
router.put('/:id', authenticate, restrict(['mediLab', 'admin']), updateLab)
router.delete('/:id', authenticate, restrict(['mediLab', 'admin']), deleteLab)

router.post('/addtests', authenticate, restrict(['mediLab']), addTest)
router.delete('/timeslots/:id', authenticate, restrict(['mediLab']), deleteTimeSlot)
router.patch('/timeslots/:id', authenticate, restrict(['mediLab']), updateTimeSlot)
router.get('/timeslots/:id', getTimeSlotsById)

export default router

