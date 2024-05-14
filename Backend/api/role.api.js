import axios from "./axios.js"

export const roles = () => axios.get("/roles")
