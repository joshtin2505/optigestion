import Nav from '../../components/Nav.jsx'
import '../../assets/css/CreateReq.css'
import { CreateReqForm } from '../../components/Forms.jsx'

function CrearSolicitud() {
  return (
    <div className='back'>
      <Nav type={1}/>
      <section className='CR-box-cont'>
          <CreateReqForm />
      </section>
    </div>
  )
}


export default CrearSolicitud