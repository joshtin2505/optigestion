import NavBar from '../components/Nav.jsx'
import OptionCards from '../components/OptionCards.jsx'
import '../assets/css/optionCards.css'
import { useAuth } from '../context/AuthContext.jsx'

function GestionSolicitudes() {
  const {response} = useAuth()
  return (
    <>
        <NavBar type={1}/>
        <section className='cardContainer'>
          <OptionCards to="/req-add" imgUrl='https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Crear Solicitud"/>
          <OptionCards to='/req-draft' imgUrl='https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Borrador"/>
          <OptionCards to='/req-trash' imgUrl='https://images.pexels.com/photos/850216/pexels-photo-850216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Papelera"/>
          <OptionCards to="/req-sent" imgUrl='https://images.pexels.com/photos/6348101/pexels-photo-6348101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Solicitudes Enviadas"/>
          <OptionCards to="/req-res" imgUrl='https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Solicitud Respondida"/>
          <OptionCards to="/req-file" imgUrl='https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Archivado"/>
            {
              response.roll !== null ? <RollDashboard roll={response.roll}/> : null
            }
          
        </section>
    </>

  )
}
const RollDashboard = ({roll}) => {
    if (roll === 0) return(
      <>
        <OptionCards to="/rector-response" imgUrl='https://images.pexels.com/photos/4631066/pexels-photo-4631066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Responder Solicitudes"/>
        <OptionCards to="/req-file" imgUrl='https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Para Cotizar"/>
        <OptionCards to="/req-file" imgUrl='https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Para Comprar"/>
      </>
      ) 
    else if (roll === 1) return <OptionCards to="/rector-response" imgUrl='https://images.pexels.com/photos/4631066/pexels-photo-4631066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Responder Solicitudes"/>
    else if (roll === 2) return (
      <>
      <OptionCards to="/to-quote" imgUrl='https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Para Cotizar"/>
      <OptionCards to="/to-buy" imgUrl='https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title="Para Comprar"/>
      </>
    )
    else return 
}

export default GestionSolicitudes