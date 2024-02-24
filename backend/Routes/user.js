import {
    updateUser,
    deleteUser, 
    getAllUsers, 
    getSingleUser, 
    getMyDoctors,
} from '../Controllers/userController.js'
import express from 'express'

import {authenticate, restrict} from '../auth/verifyToken.js'

const router = express.Router()
router.get('/info/:id', authenticate, restrict(['patient', 'admin']), getSingleUser)
router.get('/info', authenticate, restrict(['admin']), getAllUsers)

router.put('/:id', authenticate, restrict(['patient', 'admin']), updateUser)
router.delete('/:id', authenticate, restrict(['patient', 'admin']), deleteUser)

router.get('/mydoctors', authenticate, restrict(['patient']), getMyDoctors)

export default router