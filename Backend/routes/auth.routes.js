import {Router} from 'express'
import { login, register } from '../controllers/auth.controller.js'
const router = Router()

router.post("/register", register)
router.post("/login", login)
// router.get("/verify", verifyToken)
// router.post("/logout", verifyToken, logout)

export default router