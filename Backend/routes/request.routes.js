import { Router } from "express"
import {authRequired} from "../middlewares/validateToken.js"
import { createRequest,deleteRequest,getRequest,getRequirements,updateRequest, deleteAllRequest,sendSavedRequest,getAllRequirements,sendNewRequest } from "../controllers/request.controler.js"
import { authRectorRoll } from "../middlewares/validateRoll.js"

const router = Router()
// Basics
router.get('/solicitud', authRequired, getRequirements)
router.get('/solicitud/:id', authRequired, getRequest)
router.post('/solicitud', authRequired, createRequest)
router.put('/solicitud/:id', authRequired, updateRequest)
// Si ya esta guardada una solicitud como borrado, se usara esta ruta
router.put('/solicitud/send/:id', authRequired, sendSavedRequest)
// Si no esta guardada una solicitud como borrado, se usara esta otra ruta
router.post('/solicitud/send/', authRequired, sendNewRequest)
router.delete('/solicitud/:id', authRequired, deleteRequest)
router.delete('/solicitud/', authRequired, deleteAllRequest)

// Only visible to the rector

router.get('/solicitud-all', authRequired,authRectorRoll, getAllRequirements)

export default router