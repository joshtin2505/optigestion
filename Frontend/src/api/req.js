import axios from "./axios.js"

export const addRequest = async (data) => axios.post('/solicitud', data)
export const deleteRequest = async (id) => axios.delete('/solicitud/' + id)
export const updateRequest = async (data) => axios.put('/solicitud/' + data.id, data)
export const getRequest = async (id) => axios.get('/solicitud/' + id)
export const getRequirements = async () => axios.get('/solicitud/')

// Enviados
export const sendSavedRequest = async (id) => axios.put('/solicitud-send/' + id)
export const sendNewRequest = async (data) => axios.post('/solicitud-send', data)
export const getSentRequirements = async () => axios.get('/solicitud-sent/' )


// Borrador
export const getDraftRequirements = async () => axios.get('/solicitud-draft/')

// Papelera
export const toTrashRequest = async (id) => axios.put('/solicitud-trash/' + id)
export const getTrashRequirements = async () => axios.get('/solicitud-trash/' )

// Archivo
export const toFileRequest = async (id) => axios.put('/solicitud-file/' + id)
export const getFileRequirements = async () => axios.get('/solicitud-files/' )

