import axios from "./axios"

export const departament = async () => axios.get("/departament")

// --------------------

export const role = async () => axios.get("/roles")
