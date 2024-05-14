import axios from "./axios.js"

export const register = (user) => axios.post("/auth/", user)
export const users = () => axios.get("/auth/")
export const update = (id, user) => axios.put("/auth/" + id, user)
export const deleteUser = (id) => axios.delete("/auth/" + id)

export const login = (user) => axios.post("/auth/login", user)

export const verifyToken = () => axios.get("/auth/verify")

export const logout = () => axios.post("/auth/logout")

export const profile = () => axios.get("/auth/profile")
