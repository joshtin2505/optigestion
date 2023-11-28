import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import HomePage from './pages/all users/HomePage.jsx'
import GestionSolicitudes from './pages/all users/GestionSolicitudes'
import Papelera from './pages/all users/Papelera.jsx'
import Archivado from './pages/all users/Archivado.jsx'
import Enviados from './pages/all users/Enviados.jsx'
import Respondidos from './pages/all users/Respondidos.jsx'
import Borrador from './pages/all users/Borrador.jsx'
import CrearSolicitud from './pages/all users/CrearSolicitud.jsx'
import Profile from './pages/all users/Profile.jsx'
import ProtectedRoutes from './ProtectedRoutes.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import ReqProvider from './context/ReqContext.jsx'
import {useAuth} from './context/AuthContext.jsx'
import RectorRes from './pages/rector/RectorRes.jsx'
import Cotizar from './pages/logistic/Cotizar.jsx'
import Comprar from './pages/logistic/Comprar.jsx'
function App() {
  const {isAllowed} = useAuth()

  return (
      <ReqProvider>
        <ChakraProvider>
        <BrowserRouter>
        <div className='back'>

          <Routes>
            <Route path='/' element={<HomePage/>} />
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
