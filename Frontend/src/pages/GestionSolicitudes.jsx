import Nav from '../components/Nav.jsx'
import OptionCards from '../components/OptionCards.jsx'
import '../assets/css/optionCards.css'

function GestionSolicitudes() {
  return (
    <div className='back'>
        <Nav type={1}/>
        <section className='cardContainer'>
          <OptionCards to="/req-add" imgUrl='https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Crear Solicitud"/>
          <OptionCards to='/req-draft' imgUrl='https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Borrador"/>
          <OptionCards to='/req-trash' imgUrl='https://images.pexels.com/photos/850216/pexels-photo-850216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Papelera"/>
          <OptionCards to="/req-sent" imgUrl='https://images.pexels.com/photos/6348101/pexels-photo-6348101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Solicitudes Enviadas"/>
          <OptionCards to="/req-res" imgUrl='https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Solicitud Respondida"/>
          <OptionCards to="/req-file" imgUrl='https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Archivado"/>
          
        </section>
    </div>
  )
}

export default GestionSolicitudes