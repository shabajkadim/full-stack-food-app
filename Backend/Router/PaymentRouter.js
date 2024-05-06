import { Router } from "express";
import { CheckPayment } from "../Controller/Payment.Controller.js";


const router=Router()
router.post("/check-payment",CheckPayment)


export default router