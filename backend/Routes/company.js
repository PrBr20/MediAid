import express from 'express'
import { authenticate, restrict } from '../auth/verifyToken.js'
import {
    updateCompany,
    deleteCompany,
    getAllCompanies,
    getSingleCompany,
} from '../Controllers/companyController.js'
const router = express.Router({mergeParams: true})

router.get('/one/:id', getSingleCompany)
router.get('/all', getAllCompanies)
router.delete('/:id', deleteCompany)
router.put('/update/:id', updateCompany)

export default router