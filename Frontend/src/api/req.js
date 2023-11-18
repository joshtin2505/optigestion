import axios from "./axios.js"

export const addRequest = async (data) => axios.post('/solicitud', data)
export const deleteRequest = async (id) => axios.delete('/solicitud/' + id)
export const updateRequest = async (data) => axios.put('/solicitud/' + data.id, data)
export const getRequest = async (id) => axios.get('/solicitud/' + id)
export const getRequirements = async () => axios.get('/solicitud/')