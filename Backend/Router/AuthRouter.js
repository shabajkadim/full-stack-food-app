import { Router } from "express";
import { Login,  SignUp, getCurrentUser } from "../Controller/Auth.Controller.js";


const router=Router()

// router.get('/register',Register)
router.post('/signup',SignUp)
router.post('/login',Login)
router.post('/get-current-user',getCurrentUser)

export default router