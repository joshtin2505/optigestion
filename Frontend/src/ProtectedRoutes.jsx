import { useAuth } from "./context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
function ProtectedRoutes() {
    const {isAutenticated, loading} = useAuth()
    if (loading) return <h1>Loading...</h1>
    if (!loading && !isAutenticated) return <Navigate to="/" replace/>
    return (
      
    <Outlet/>
  )
}

export default ProtectedRoutes