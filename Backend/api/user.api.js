import axios from "./axios.js"

const API_URL = "http://localhost:8080/api"

const registerUsuario = (user) => axios.post("/usuario/guardar", user)
const getUser = (id) => axios.get("usuario/" + id)
const getUserByUserName = (username) =>
  axios.get("usuario/username?username=" + username)
const getAllUsers = () => axios.get("/usuario/all")
const updateUsuario = (id, user) => axios.put("usuario/" + id, user)
const deleteUsuario = (id) => axios.delete("usuario/" + id)

//  const profile = () => axios.get("usuario/profile") // Para Implementar en la ruta

export {
  registerUsuario,
  getAllUsers,
  updateUsuario,
  deleteUsuario,
  getUser,
  getUserByUserName,
}
