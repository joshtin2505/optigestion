import { Router } from "express"
import {authRequired} from "../middlewares/validateToken.js"
import { authRectorRoll,authLogisticRoll } from "../middlewares/validateRoll.js"
import { 
    createRequest,
    deleteRequest,
    getRequest,
    getRequirements,
    updateRequest, 
    sendSavedRequest,
    getAllRequirements,
    sendNewRequest,
    rectorResponse,
    getAllAprovedRequirements,
    logisticResponse,
    fileRequest,
    getFiles,
    getTrash,
    trashRequest,
    getDraft,
    getAllRejectedRequirements
} from "../controllers/request.controler.js"

const router = Router()
// Basics
router.get('/solicitud', authRequired, getRequirements)
router.get('/solicitud/:id', authRequired, getRequest)
router.post('/solicitud', authRequired, createRequest)
router.put('/solicitud/:id', authRequired, updateRequest)
router.delete('/solicitud/:id', authRequired, deleteRequest)

// ------------------------------->
//Advanced

// Enviar
// Si ya esta guardada una solicitud como borrado, se usara esta ruta
router.put('/solicitud/send/:id', authRequired, sendSavedRequest)
// Si no esta guardada una solicitud como borrado, se usara esta otra ruta
router.post('/solicitud/send', authRequired, sendNewRequest)
// Ver los enviados
router.get('/solicitud/sent', authRequired, sendNewRequest)
router.get('/solicitud/sent/:id', authRequired, sendNewRequest)

// Archivo
router.put('/solicitud/file-set/:id', authRequired, fileRequest)
router.get('/solicitud-files', authRequired, getFiles)

// Papelera
router.put('/solicitud-trash/:id', authRequired, trashRequest)
router.get('/solicitud-trash', authRequired, getTrash)

// Borrador
router.get('/solicitud-draft', authRequired, getDraft)

// Respondidos
router.get('/solicitud-approved', authRequired, getAllAprovedRequirements)
router.get('/solicitud-rejected', authRequired, getAllRejectedRequirements)

// ------------------------------->

// Only visible to the rector
router.get('/solicitud-allSend', authRequired,authRectorRoll, getAllRequirements)
router.put('/solicitud-res-YorN/:id?', authRequired,authRectorRoll, rectorResponse)

// Only visible to the Logistic
router.get('/solicitud-allApproved', authRequired,authLogisticRoll, getAllAprovedRequirements)
router.put('/solicitud-res-prices/:id?', authRequired,authLogisticRoll, logisticResponse)


export default router