import { createContext, useState, useContext } from "react"
import { registerRequest } from '../api/auth'

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

    const singUp = async(user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data)
            setResponse(res.data) 
            setIsAuthenticated(true)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <AuthContext.Provider value={{
            singUp,
            response,
            isAutenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}