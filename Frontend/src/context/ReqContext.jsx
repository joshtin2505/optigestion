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
    const [request, setRequest] = useState()
    const [errors, setErrors] = useState()
    const createReq = async (data) =>{
        try {
            const res = await addRequest(data)
            setRequest(res.data) 
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

  return (
    <ReqContext.Provider value={{
        createReq,
        getAllReq,
        request,
        errors
    }}>
        {children}
    </ReqContext.Provider>
  )
}

export default ReqProvider