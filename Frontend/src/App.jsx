import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import HomePage from './pages/HomePage.jsx'
import GestionSolicitudes from './pages/GestionSolicitudes'
function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/req-manager' element={<GestionSolicitudes/>} />
          <Route path='/req-trash' element={<h1>Papelera</h1>} />
          <Route path='/req-file' element={<h1>Solicitudes Archivadas</h1>} />
          <Route path='/req-sent' element={<h1>Solicitudes Enviadas</h1>} />
          <Route path='/req-res' element={<h1>Solicitudes Respondidas</h1>} />
          <Route path='/req-draft' element={<h1>Borrador</h1>} />
          <Route path='/req-add' element={<h1>Nueva Solicitud</h1>} />
          <Route path='/profile' element={<h1>Mi perfil</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
