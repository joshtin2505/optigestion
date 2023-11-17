import axios from "./axios.js"

export const addRequest = (data) => axios.post('/solicitud', data)
export const deleteRequest = () => axios.delete('/solicitud/:id')
export const updateRequest = (data) => axios.put('/solicitud/:id', data)
export const getRequest = () => axios.get('/solicitud/')
export const getRequirements = () => axios.get('/solicitud/:id')