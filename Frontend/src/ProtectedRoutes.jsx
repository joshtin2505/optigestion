import { useAuth } from "./context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
function ProtectedRoutes({children, isAllowed}) {
    const {loading, isAutenticated} = useAuth()
    if (loading) return <h1>Loading...</h1>
    if (!loading && !isAutenticated && !isAllowed) return <Navigate to="/" replace/>
    return children ? children : <Outlet/>
  
}

export default ProtectedRoutes