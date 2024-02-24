import Cart from '../models/CartSchema.js'
import User from '../models/UserSchema.js'
import Medicine from '../models/MedicineSchema.js'
import Order from '../models/OrderSchema.js'

export const modifyCart = async (req, res) => {
    const userid = req.params.userid
    const { medicineId, unit, unitPrice, qty } = req.body

    try {
        let cart = await Cart.findOne({user: userid})
        if(!cart) cart = new Cart({user: userid, medicines: [], totalPrice: 0})

        let updated = false
        let newMedicines = []
        for(let i=0; i<cart.medicines.length; i++) {
            if(cart.medicines[i].medicine == medicineId && cart.medicines[i].unit == unit) {
                updated = true
                if(qty <= 0) continue
                cart.medicines[i].qty = qty
                cart.medicines[i].unitPrice = unitPrice
                newMedicines.push(cart.medicines[i])
            }
            else newMedicines.push(cart.medicines[i])
        }

        if(!updated && qty > 0)
            cart.medicines.push({medicine: medicineId, unit: unit, unitPrice: unitPrice, qty: qty})
        else cart.medicines = newMedicines

        cart.totalPrice = 0
        for(let i=0; i<cart.medicines.length; i++)
            cart.totalPrice += cart.medicines[i].unitPrice * cart.medicines[i].qty

        await cart.save()
        
        cart = await Cart.findOne({user: userid}).populate('medicines.medicine', '-overview')
        res.status(200).json({success: true, data: cart})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal server error"})
    }
}

export const clearCart = async (req, res) => {
    const userid = req.params.userid
    try {
        let cart = await Cart.findOne({user: userid})

        cart.medicines = []
        cart.totalPrice = 0
        await cart.save()

        res.status(200).json({success: true, msg: "Cart cleared"})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal server error"})
    }
}

export const createOrder = async (req, res) => {
    const userid = req.params.userid
    const transactionId = req.body.transactionId

    try {
        let cart = await Cart.findOne({user: userid})
        if(!cart || cart.medicines.length == 0)
            return res.status(400).json({success: false, msg: "Cart is empty"})

        let newOrder = new Order({
            user: userid,
            medicines: [],
            totalPrice: cart.totalPrice,
            trxId: transactionId
        })
        for(let i=0; i<cart.medicines.length; i++) {
            newOrder.medicines.push({
                medicine: cart.medicines[i].medicine,
                unit: cart.medicines[i].unit,
                unitPrice: cart.medicines[i].unitPrice,
                qty: cart.medicines[i].qty
            })
        }
        await newOrder.save()

        cart.medicines = []
        cart.totalPrice = 0
        await cart.save()

        res.status(200).json({success: true, msg: "Order created", data: newOrder})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal server error"})
    }
}

export const fetchCart = async (req, res) => {
    const userid = req.params.userid
    try {
        let cart = await Cart.findOne({user: userid}).populate('medicines.medicine', '-overview')
        res.status(200).json({success: true, data: cart})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal server error"})
    }
}

export const fetchOrders = async (req, res) => {
    const userid = req.params.userid
    try {
        let orders = await Order.find({user: userid}).populate('medicines.medicine', '-overview')
        res.status(200).json({success: true, data: orders})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, msg: "Internal server error"})
    }
}