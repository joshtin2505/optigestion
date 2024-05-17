import axios from "./axios.js"

export const addRequest = async (data) => axios.post("/req/base/", data)
export const deleteRequest = async (id) => axios.delete("/req/base/" + id)
export const updateRequest = async (data) =>
  axios.put("/req/base/" + data.id, data)
export const getRequest = async (id) => axios.get("/req/base/" + id)
export const getRequirements = async () => axios.get("/req/base/")

// Enviados
export const sendSavedRequest = async (id) => axios.put("/req/send/" + id)
export const sendNewRequest = async (data) => axios.post("/req/send", data)
export const getSentRequirements = async () => axios.get("/req/sent/")

// Borrador
export const getDraftRequirements = async () => axios.get("/req/draft/")

// Papelera
export const toTrashRequest = async (id) => axios.put("/req/trash/" + id)
export const getTrashRequirements = async () => axios.get("/req/trash/")

// Archivo
export const toFileRequest = async (id) => axios.put("/req/file/" + id)
export const getFileRequirements = async () => axios.get("/req/files/")

// elegir
export const choseQuote = async (data) =>
  axios.put("/req/electQuote/" + data.id, data)

// Rector
export const getAllSentRequirements = async () => axios.get("/req/allSent/")

export const rectorResponse = async (data) =>
  axios.put("/req/res-YorN/" + data.id, data)

//Respondidos
export const getApprovedRequirements = async () => axios.get("/req/approved/")
export const getRejectedRequirements = async () => axios.get("/req/rejected/")

// Logistico
export const getAllToQuoteRequirements = async () => axios.get("/req/toQuote/")
export const getAllToBuyRequirements = async () => axios.get("/req/toBuy/")
export const logisticResponse = async (data) =>
  await axios.put("/req/res-prices/", data)
// export const logisticResponse = async (data) =>
//   await axios.put("/req/res-prices/", data, {
//     headers: { "Content-Type": "multipart/form-data" },
//   })
