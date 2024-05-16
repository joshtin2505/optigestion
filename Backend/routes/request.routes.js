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
router.get("/base/all", authRequired, getRequirements)
router.get("/base/:id", authRequired, getRequest)
router.post("/base/", authRequired, createRequest)
router.put("/base/:id", authRequired, updateRequest)
router.delete("/base/:id", authRequired, deleteRequest)

// ------------------------------->
//Advanced

// Enviar
// Si ya esta guardada una solicitud como borrado, se usara esta ruta
router.put("/send/:id", authRequired, sendSavedRequest)
// Si no esta guardada una solicitud como borrado, se usara esta otra ruta
router.post("/send", authRequired, sendNewRequest)
// Ver los enviados
router.get("/sent", authRequired, getSent)

// Archivo
router.put("/file/:id", authRequired, fileRequest)
router.get("/files", authRequired, getFiles)

// Papelera
router.put("/trash/:id", authRequired, trashRequest)
router.get("/trash", authRequired, getTrash)

// Borrador
router.get("/draft", authRequired, getDraft)

// Respondidos
router.get("/approved", authRequired, getAllAprovedRequirements)
router.get("/rejected", authRequired, getAllRejectedRequirements)

// Elegir
router.put("/electQuote/:id", authRequired, chosenQuote)

// ------------------------------->

// Only visible to the rector
router.get("/allSent", authRequired, authRectorRoll, getAllSentRequirements)
router.put("/res-YorN/:id", authRequired, authRectorRoll, rectorResponse)

// Only visible to the Logistic
router.get(
  "/toQuote",
  authRequired,
  authLogisticRoll,
  getAllToQuoteRequirements
)
router.get("/toBuy", authRequired, authLogisticRoll, getAllToBuyRequirements)
router.put(
  "/res-prices/",
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
