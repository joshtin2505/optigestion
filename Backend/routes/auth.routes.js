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
router.put("/updateOne/:id", updateUser)
router.delete("/deleteOne/:id", deleteUser)

router.post("/", authRequired, authAdminRoll, register)
router.get("/", authRequired, getUsers)
router.put("/:id", authRequired, authAdminRoll, updateUser)
router.delete("/:id", authRequired, authAdminRoll, deleteUser)

router.post("/login", login)
router.get("/verify", verifyToken)
router.post("/logout", logout)
router.get("/profile", authRequired, profile)

export default router
