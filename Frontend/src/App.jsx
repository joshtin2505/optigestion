import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import HomePage from './pages/HomePage.jsx'
import GestionSolicitudes from './pages/GestionSolicitudes'
import Papelera from './pages/Papelera.jsx'
import Archivado from './pages/Archivado.jsx'
import Enviados from './pages/Enviados.jsx'
import Respondidos from './pages/Respondidos.jsx'
import Borrador from './pages/Borrador.jsx'
import CrearSolicitud from './pages/CrearSolicitud.jsx'
import Profile from './pages/Profile.jsx'
import ProtectedRoutes from './ProtectedRoutes.jsx'
import { ChakraProvider } from '@chakra-ui/react'
function App() {

  return (
    <AuthContextProvider>
      <ChakraProvider>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route element={<ProtectedRoutes/>}>
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/req-manager' element={<GestionSolicitudes/>} />
            <Route path='/req-trash' element={<Papelera/>} />
            <Route path='/req-file' element={<Archivado/>} />
            <Route path='/req-sent' element={<Enviados/>} />
            <Route path='/req-res' element={<Respondidos/>} />
            <Route path='/req-draft' element={<Borrador/>} />
            <Route path='/req-add' element={<CrearSolicitud/>} />
            <Route path='/profile' element={<Profile/>} />
          </Route>

        </Routes>
      </BrowserRouter>
      </ChakraProvider>
    </AuthContextProvider>
  )
}

export default App
