import { Router } from "express"
import {authRequired} from "../middlewares/validateToken.js"
import { createRequest,deleteRequest,getRequest,getRequirements,updateRequest } from "../controllers/request.controler.js"

const router = Router()

router.get('/solicitud', authRequired, getRequirements)
router.get('/solicitud/:id', authRequired, getRequest)
router.post('/solicitud', authRequired, createRequest)
router.put('/solicitud/:id', authRequired, updateRequest)
router.delete('/solicitud/:id', authRequired, deleteRequest)

export default router