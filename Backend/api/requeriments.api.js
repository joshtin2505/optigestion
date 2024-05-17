import axios from "./axios.js"

const addRequest = async (data) => axios.post("/requerimentos", data)
const deleteRequeriment = async (id) => axios.delete("/requerimentos/" + id)
const updateRequeriment = async (data) =>
  axios.put("/requerimentos/" + data.id, data)
const getRequerimentById = async (id) => axios.get("/requerimentos/" + id)
const getAllRequirements = async () => axios.get("/requerimentos")

const logisticRes = async (id, data) =>
  await axios.put("/cotizacion/send-cotizacion/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

export {
  addRequest,
  deleteRequeriment,
  updateRequeriment,
  getRequerimentById,
  getAllRequirements,
  logisticRes,
}
