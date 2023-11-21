import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage.jsx'
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
import ReqProvider from './context/ReqContext.jsx'
import {useAuth} from './context/AuthContext.jsx'
import RectorRes from './pages/RectorRes.jsx'
import Cotizar from './pages/Cotizar.jsx'
import Comprar from './pages/Comprar.jsx'
function App() {
  const {isAllowed} = useAuth()
  const admin = isAllowed === 0 ? true : false
  // console.log(admin)
  return (
      <ReqProvider>
        <ChakraProvider>
        <BrowserRouter>
        <div className='back'>

          <Routes>
            <Route path='/' element={<HomePage/>} />
            {/* Admin */}
            <Route path='/register' element={
                <ProtectedRoutes isAllowed={isAllowed === 0} >
                  <RegisterPage/>
                </ProtectedRoutes>
              } />
            {/* Rector */}
            <Route path='/rector-response' element={
                <ProtectedRoutes isAllowed={isAllowed === 1 || isAllowed === 0} >
                  <RectorRes/>
                </ProtectedRoutes>
              } />
            {/* Logistico */}
            <Route element={<ProtectedRoutes isAllowed={isAllowed === 2 || isAllowed === 0}/>}>
              <Route path='/to-quote' element={<Cotizar/>} />
              <Route path='/to-buy' element={<Comprar/>} />
            </Route>
            {/* All Option */}
            <Route element={<ProtectedRoutes isAllowed={isAllowed === 0 || isAllowed === 1 || isAllowed === 2 || isAllowed === 3}/>}>
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
        </div>
        </BrowserRouter>
        </ChakraProvider>
      </ReqProvider>
  )
}

export default App
