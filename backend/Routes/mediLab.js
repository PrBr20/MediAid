import{
    updateLab,
    searchMediLabs,
    getSingleMediLab,
    getSingleMediLabTestbyId,
    deleteLab,
    addTest,
    deleteTest,
    updateTest,
    getTestsById,
    searchTests
}from '../Controllers/LabController.js'
// import{
//     getSingleTest
// }from '../Controllers/testController.js'
import express from 'express'
import { authenticate,restrict } from '../auth/verifyToken.js'

const router = express.Router({mergeParams: true})
router.get('/fetch/:id', authenticate, getSingleMediLab)
// router.get('/medilabs/alltests/fetch/:id',authenticate,getSingleMediLabTestbyId)
router.get('/search', authenticate, searchMediLabs)
router.put('/:id', authenticate, restrict(['mediLab', 'admin']), updateLab)
router.delete('/:id', authenticate, restrict(['mediLab', 'admin']), deleteLab)

router.post('/addtests', authenticate, restrict(['mediLab']), addTest)
router.delete('/addtests/:id', authenticate, restrict(['mediLab']), deleteTest)
router.patch('/addtests/:id', authenticate, restrict(['mediLab']), updateTest)
router.get('/addtests/:id', getTestsById)
router.get('/tests/search', authenticate, searchTests)
// router.get('/fetchTest/:id', authenticate, getSingleTest)

export default router

