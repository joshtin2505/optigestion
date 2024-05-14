import { Router } from "express"
import { upload } from "../config.js"
import { authRequired } from "../middlewares/validateToken.js"
import {
  authRectorRoll,
  authLogisticRoll,
} from "../middlewares/validateRoll.js"
import {
  createRequest,
  deleteRequest,
  getRequest,
  getRequirements,
  updateRequest,
  sendSavedRequest,
  getAllSentRequirements,
  sendNewRequest,
  rectorResponse,
  getAllAprovedRequirements,
  logisticResponse,
  fileRequest,
  getFiles,
  getTrash,
  trashRequest,
  getDraft,
  getAllRejectedRequirements,
  getSent,
  getAllToQuoteRequirements,
  chosenQuote,
  getAllToBuyRequirements,
} from "../controllers/request.controler.js"

const router = Router()
// Basics
router.get("/all", authRequired, getRequirements)
router.get("/:id", authRequired, getRequest)
router.post("/", authRequired, createRequest)
router.put("/:id", authRequired, updateRequest)
router.delete("/:id", authRequired, deleteRequest)

// ------------------------------->
//Advanced

// Enviar
// Si ya esta guardada una solicitud como borrado, se usara esta ruta
router.put("/solicitud-send/:id", authRequired, sendSavedRequest)
// Si no esta guardada una solicitud como borrado, se usara esta otra ruta
router.post("/solicitud-send", authRequired, sendNewRequest)
// Ver los enviados
router.get("/solicitud-sent", authRequired, getSent)

// Archivo
router.put("/solicitud-file/:id", authRequired, fileRequest)
router.get("/solicitud-files", authRequired, getFiles)

// Papelera
router.put("/solicitud-trash/:id", authRequired, trashRequest)
router.get("/solicitud-trash", authRequired, getTrash)

// Borrador
router.get("/solicitud-draft", authRequired, getDraft)

// Respondidos
router.get("/solicitud-approved", authRequired, getAllAprovedRequirements)
router.get("/solicitud-rejected", authRequired, getAllRejectedRequirements)

// Elegir
router.put("/solicitud-electQuote/:id", authRequired, chosenQuote)

// ------------------------------->

// Only visible to the rector
router.get(
  "/solicitud-allSent",
  authRequired,
  authRectorRoll,
  getAllSentRequirements
)
router.put(
  "/solicitud-res-YorN/:id",
  authRequired,
  authRectorRoll,
  rectorResponse
)

// Only visible to the Logistic
router.get(
  "/solicitud-toQuote",
  authRequired,
  authLogisticRoll,
  getAllToQuoteRequirements
)
router.get(
  "/solicitud-toBuy",
  authRequired,
  authLogisticRoll,
  getAllToBuyRequirements
)
router.put(
  "/solicitud-res-prices/",
  authRequired,
  authLogisticRoll,
  upload.fields([
    { name: "id", maxCount: 1 },
    { name: "pdf1", maxCount: 1 },
    { name: "pdf2", maxCount: 1 },
    { name: "pdf3", maxCount: 1 },
  ]),
  logisticResponse
)

export default router
