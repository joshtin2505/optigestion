import axios from "./axios.js"

const addRequest = async (data) => axios.post("/requerimentos", data)
const deleteRequest = async (id) => axios.delete("/requerimentos/" + id)
const updateRequeriment = async (data) =>
  axios.put("/requerimentos/" + data.id, data)
const getRequerimentById = async (id) => axios.get("/requerimentos/" + id)
const getAllRequirements = async () => axios.get("/requerimentos")

export {
  addRequest,
  deleteRequest,
  updateRequeriment,
  getRequerimentById,
  getAllRequirements,
}

// Enviados
export const sendSavedRequest = async (id) =>
  axios.put("/requerimentos/solicitud-send/" + id)
export const sendNewRequest = async (data) =>
  axios.post("/requerimentos/solicitud-send", data)
export const getSentRequirements = async () =>
  axios.get("/requerimentos/solicitud-sent/")

// Borrador
export const getDraftRequirements = async () =>
  axios.get("/requerimentos/solicitud-draft/")

// Papelera
export const toTrashRequest = async (id) =>
  axios.put("/requerimentos/solicitud-trash/" + id)
export const getTrashRequirements = async () =>
  axios.get("/requerimentos/solicitud-trash/")

// Archivo
export const toFileRequest = async (id) =>
  axios.put("/requerimentos/solicitud-file/" + id)
export const getFileRequirements = async () =>
  axios.get("/requerimentos/solicitud-files/")

// elegir
export const choseQuote = async (data) =>
  axios.put("/requerimentos/solicitud-electQuote/" + data.id, data)

// Rector
export const getAllSentRequirements = async () =>
  axios.get("/requerimentos/solicitud-allSent/")

export const rectorResponse = async (data) =>
  axios.put("/requerimentos/solicitud-res-YorN/" + data.id, data)

//Respondidos
export const getApprovedRequirements = async () =>
  axios.get("/requerimentos/solicitud-approved/")
export const getRejectedRequirements = async () =>
  axios.get("/requerimentos/solicitud-rejected/")

// Logistico
export const getAllToQuoteRequirements = async () =>
  axios.get("/requerimentos/solicitud-toQuote/")
export const getAllToBuyRequirements = async () =>
  axios.get("/requerimentos/solicitud-toBuy/")
export const logisticResponse = async (data) =>
  await axios.put("/requerimentos/solicitud-res-prices/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
