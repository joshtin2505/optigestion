import { 
    createContext, 
    useState, 
    useContext, 
    useEffect 
} from "react"
import { 
    registerRequest, 
    loginRequest,
    verifyTokenRequest,
    logoutRequest ,
    profile
} from '../api/auth.js'
import Cookies from 'js-cookie'
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
    const [loading, setLoading] = useState(true)
    const [closedSession, setClosedSession] = useState(false)
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
    const logOut = async () =>{
        try {
            const res = await logoutRequest()
            if(!res) return console.log("No se pudo cerrar sesión")
            setClosedSession(!closedSession)
        } catch (error) {
            console.log(error)
        }
    }
    const getProfile = async () =>{
        try {
            const res = await profile()
            if (!res) throw new Error('Error!!! - No response')
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    useEffect(()=>{
        async function  checkLogin (){
            const cookies = Cookies.get()
            if (!cookies.token){
                setIsAuthenticated(false)
                setLoading(false)
                return setResponse(null)
            }
                try {
                    const res = await verifyTokenRequest(cookies.token)
                    if (!res.data) {
                        setIsAuthenticated(false)
                        setLoading(false)
                        return
                    }
                    setIsAuthenticated(true)
                    setResponse(res.data)
                    setLoading(false)

                } catch (error) {
                    setIsAuthenticated(false)
                    setResponse(null)
                    setLoading(false)
                }
        }
        checkLogin()
    },[closedSession])  

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
            logOut,
            getProfile,
            response,
            isAutenticated,
            errors,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}