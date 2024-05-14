import { Router } from "express"

import { getAllDepartaments } from "../controllers/departament.controller.js"

const router = Router()

router.get("/", getAllDepartaments)

export default router
