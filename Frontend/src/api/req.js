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

// elegir
export const choseQuote = async (data) => axios.put('/solicitud-electQuote/' + data.id, data)


// Rector 
export const getAllSentRequirements = async () => axios.get('/solicitud-allSent/' )

export const rectorResponse = async (data) => axios.put('/solicitud-res-YorN/' + data.id, data)

//Respondidos
export const getApprovedRequirements = async () => axios.get('/solicitud-approved/')
export const getRejectedRequirements = async () => axios.get('/solicitud-rejected/')

// Logistico
export const getAllToQuoteRequirements = async () => axios.get('/solicitud-toQuote/')
export const getAllToBuyRequirements = async () => axios.get('/solicitud-toBuy/')
export const logisticResponse = async (data) => await axios.put('/solicitud-res-prices/', data, {headers: {'Content-Type': 'multipart/form-data'}})
