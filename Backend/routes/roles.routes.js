import { Router } from "express"

import { getAllRoles } from "../controllers/roles.controller.js"

const router = Router()

router.get("/", getAllRoles)

export default router
