import { createContext, useContext } from "react"
import {addRequest, deleteRequest, getRequest,getRequirements,updateRequest} from '../api/req.js'
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
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const getAllReq = async (data) =>{
        try {
            const res = await getRequirements(data)
            return res.data
        } catch (error) {
            setErrors(error)
        }
    }
    const updateReq = async (data) =>{
        try {
            const res = await updateRequest(data)
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const deleteReq = async (id) =>{
        try {
            const res = await deleteRequest(id)
            console.log(id)
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
  return (
    <ReqContext.Provider value={{
        createReq,
        getAllReq,
        updateReq,
        deleteReq,
        response,
        errors
    }}>
        {children}
    </ReqContext.Provider>
  )
}

export default ReqProvider