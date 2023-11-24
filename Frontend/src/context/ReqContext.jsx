import { createContext, useContext } from "react"
import {
    addRequest, 
    deleteRequest, 
    updateRequest,
    toTrashRequest,
    toFileRequest,
    sendNewRequest,
    sendSavedRequest,
    rectorResponse,
    logisticResponse,
    getRequest,
    getRequirements,
    getDraftRequirements,
    getTrashRequirements,
    getFileRequirements,
    getSentRequirements,
    getAllSentRequirements,
    getApprovedRequirements,
    getRejectedRequirements,
    getAllToQuoteRequirements,
    choseQuote,
    getAllToBuyRequirements
} from '../api/req.js'
import { useState } from "react"
export const ReqContext = createContext() 

export const useReq = () =>{
    const context = useContext(ReqContext)
    if (! context) {
        throw new Error('useAuth must be used within ReqProvider')
    }
    return context
}

function ReqProvider({children}) {
    const [response, setResponse] = useState()
    const [errors, setErrors] = useState()

    const createReq = async (data) =>{
        try {
            const res = await addRequest(data)
            if (!res) throw new Error('No response')
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const getAllReq = async () =>{
        try {
            const res = await getRequirements()
            if (!res) throw new Error('No response')
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
    const getAllDraftReq = async () =>{
        try {
            const res = await getDraftRequirements()
            if (!res) throw new Error('No response')
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
    const getAllTrashReq = async () =>{
        try {
            const res = await getTrashRequirements()
            if (!res) throw new Error('No response')
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
    const getAllFileReq = async () =>{
        try {
            const res = await getFileRequirements()
            if (!res) throw new Error('No response')
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
    const getAllsentReq = async () =>{
        try {
            const res = await getSentRequirements()
            if (!res) throw new Error('No response')
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
    // Nunca usada getReq() ⬇️
    const getReq = async (id) =>{
        try {
            const res = await getRequest(id)
            if (!res) throw new Error('No response')
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
    const getSentRector = async () =>{
        try {
            const res = await getAllSentRequirements()
            if (!res) throw new Error('No response')
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
    const getApprovedReq = async () =>{
        try {
            const res = await getApprovedRequirements()
            if (!res) throw new Error('No response')
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
    const getRejectedReq = async () =>{
        try {
            const res = await getRejectedRequirements()
            if (!res) throw new Error('No response')
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
    const getAllToQuoteReq = async () =>{
        try {
            const res = await getAllToQuoteRequirements()
            if (!res) throw new Error('No response')
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
    const getAllToBuyReq = async () =>{
        try {
            const res = await getAllToBuyRequirements()
            if (!res) throw new Error('No response')
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
// <----------------------------->
    const updateReq = async (data) =>{
        try {
            const res = await updateRequest(data)
            if (!res) throw new Error('No response')
            console.log(data)
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const trashReq = async (id) =>{
        try {
            const res = await toTrashRequest(id)
            if (!res) throw new Error('No response')
            console.log(id)
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const fileReq = async (id) =>{
        try {
            const res = await toFileRequest(id)
            if (!res) throw new Error('No response')
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const deleteReq = async (id) =>{
        try {
            const res = await deleteRequest(id)
            if (!res) throw new Error('No response')
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const sendInNewReq = async (data) =>{
        try {
            const res = await sendNewRequest(data)
            if (!res) throw new Error('No response')
            console.log(data)
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const sendSavedReq = async (data) =>{
        try {
            const res = await sendSavedRequest(data)
            if (!res) throw new Error('No response')
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const sendRectorRes = async (data) =>{
        try {
            const res = await rectorResponse(data)
            if (!res) throw new Error('No response')
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const LogisticRes = async (data) =>{
        try {
            const res = await logisticResponse(data)
            if (!res) throw new Error('No response')
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const setChosenQuote = async (data) =>{
        try {
            const res = await choseQuote(data)
            if (!res) throw new Error('No response')
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        } 
    }
  return (
    <ReqContext.Provider value={{
        getAllReq,
        getAllDraftReq,
        getAllFileReq,
        getAllTrashReq,
        getAllsentReq,
        getReq,
        getSentRector,
        getApprovedReq,
        getRejectedReq,
        getAllToQuoteReq,
        getAllToBuyReq,
        createReq,
        updateReq,
        deleteReq,
        trashReq,
        fileReq,
        sendInNewReq,
        sendSavedReq,
        sendRectorRes,
        LogisticRes,
        setChosenQuote,
        response,
        errors
    }}>
        {children}
    </ReqContext.Provider>
  )
}

export default ReqProvider