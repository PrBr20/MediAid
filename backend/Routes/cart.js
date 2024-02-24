import express from 'express'
import { authenticate, restrict } from '../auth/verifyToken.js'
import {
    modifyCart,
    clearCart,
    createOrder,
    fetchCart,
    fetchOrders
} from '../Controllers/cartController.js'
const router = express.Router({mergeParams: true})

router.post('/modify/:userid', modifyCart)
router.post('/clear/:userid', clearCart)
router.post('/complete/:userid', createOrder)

router.get('/fetchcart/:userid', fetchCart)
router.get('/fetchorders/:userid', fetchOrders)

export default router