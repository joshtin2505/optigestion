import { Router } from "express"
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js"
import { authAdminRoll } from "../middlewares/validateRoll.js"
const router = Router()

router.post("/reg-secret", register)
router.get("/all", getUsers)
router.post("/register", authRequired, authAdminRoll, register)
router.get("/users", authRequired, getUsers)
router.put("/updateOne/:id", updateUser)
router.put("/update/:id", authRequired, authAdminRoll, updateUser)
router.delete("/deleteOne/:id", deleteUser)
router.delete("/delete/:id", authRequired, authAdminRoll, deleteUser)

router.post("/login", login)
router.get("/verify", verifyToken)
router.post("/logout", logout)
router.get("/profile", authRequired, profile)

export default router
