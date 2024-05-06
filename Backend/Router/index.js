import { Router } from "express";
import AuthRouter from './AuthRouter.js'
import ProductRouter from './ProductRouter.js'
import PaymentRouter from './PaymentRouter.js'



const router=Router()
router.use('/auth',AuthRouter)
router.use("/product",ProductRouter)
router.use("/payment" ,PaymentRouter)




export default router