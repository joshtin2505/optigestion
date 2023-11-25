import { 
    createContext, 
    useState, 
    useContext, 
    useEffect 
} from "react"
import { 
    register,
    users, 
    update,
    deleteUser,
    login,
    verifyToken,
    logout ,
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
    const [isAllowed, setIsAllowed] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    const [closedSession, setClosedSession] = useState(false)
    const singUp = async(user) => {
        try {
            const res = await register(user)
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const getUsers = async() =>{
        try {
            const res = await users()
            return res
        } catch (err) {
           setErrors(err) 
        }
    }
    const updateUser = async(user) => {
        try {
            const res = await update(user)
            setResponse(res.data) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const userDelete = async(id) => {
        try {
            const res = await deleteUser(id)
            setResponse(res.data)
        } catch (err) {
            setErrors(err.response.data)
        }
    }
    const singIn = async (user) =>{
        try {
            const res = await login(user)
            setIsAuthenticated(true)
            setResponse(res.data)
        } catch (err) {
            setErrors(err.response.data)
        }
    }
    const logOut = async () =>{
        try {
            const res = await logout()
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
                    const res = await verifyToken(cookies.token)
                    if (!res.data) {
                        setIsAuthenticated(false)
                        setLoading(false)
                        return
                    }
                    if(res.data.roll === 0 ) setIsAllowed(0)
                    else if(res.data.roll === 1) setIsAllowed(1)
                    else if(res.data.roll === 2) setIsAllowed(2)
                    else if(res.data.roll === 3) setIsAllowed(3)
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
            getUsers,
            updateUser,
            userDelete,
            singIn,
            logOut,
            getProfile,
            response,
            isAutenticated,
            isAllowed,
            errors,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}