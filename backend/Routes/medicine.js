import express from 'express'
import { authenticate, restrict } from '../auth/verifyToken.js'
const router = express.Router({mergeParams: true})
import {createNewMedicine, prescriptionSearch, searchMedicine, createReview, deleteReview, fetchReviews, fetchOneMedicine} from '../Controllers/medicineController.js'

router.put('/', createNewMedicine)
router.get('/search', searchMedicine)
router.get('/presc/:apptid', prescriptionSearch)
router.get('/fetchone/:id', fetchOneMedicine)

router.put('/review/:medid', authenticate, createReview)
router.delete('/review/:revid', deleteReview)
router.get('/review', fetchReviews)
export default router