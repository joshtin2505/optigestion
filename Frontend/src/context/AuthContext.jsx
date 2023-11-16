import { createContext, useState, useContext, useEffect } from "react"
import { registerRequest, loginRequest } from '../api/auth'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (! context) {
        throw new Error('useAuth must be used within AuthContextProvider')
    }
    return context
}

export const AuthContextProvider = ({children}) => {
    const [response, setResponse] = useState(null)
    const [isAutenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const singUp = async(user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data)
            setResponse(res.data) 
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const singIn = async (user) =>{
        try {
            const res = await loginRequest(user)
            console.log(res.data)
            setIsAuthenticated(true)
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    useEffect(() => {
        console.log(errors)
        if (errors.length > 0 ){
            const timer = setTimeout(()=> {
                setErrors([])
                console.log("clear")
            }, 5000)
            return () => clearTimeout(timer)
        }
    },[errors])
    return(
        <AuthContext.Provider value={{
            singUp,
            singIn,
            response,
            isAutenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}