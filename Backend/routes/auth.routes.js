import {Router} from 'express'
import { login, register, logout,profile, verifyToken } from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
const router = Router()

// Pendiente a enpapsular en un super usuario
router.post("/register", authRequired,register) //
// 
router.post("/login", login)
router.get("/verify", verifyToken)
router.post("/logout", authRequired,logout)
router.get("/profile", authRequired, profile)

export default router