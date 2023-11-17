import Nav from '../components/Nav.jsx'
import '../assets/css/CreateReq.css'
import {useForm} from 'react-hook-form'
import { useReq } from '../context/ReqContext.jsx'
function CrearSolicitud() {
  const {
    register,
    handleSubmit,
    formState:{
      errors
    }
  } = useForm()

  const {createReq, response} = useReq()

  const onSubmit = handleSubmit((values)=>{
    createReq(values)
    // console.log(response)
  })

  return (
    <div className='back'>
      <Nav type={1}/>
      <section className='CR-box-cont'>
        <div className='CR-container'>
          <h2>Solicitud</h2>
          <form action="" onSubmit={onSubmit}>
            <div className='head'>
              <label htmlFor="">Titulo:</label>
              <input type="text" {...register('title',{
                required: true,
                min: 5
              })} />
              <label htmlFor="">Estado:</label>
            </div>
            {
              errors.title && (
                <div className="error">Se necita un titulo </div>
              )
            }
            <br />
            <label htmlFor="">Descripcion:</label>
            <br />
            <textarea {...register('description', {
              required: true
            })} ></textarea>
            {
              errors.description && (
                <div className="error">Se necita una descripción</div>
              )
            }
            <div>
              <div className="btnOptions">
              <button type='reset' className='btnClear'>Limpiar Campos</button>
              <button type='submit' className='btnSave'>Guardar</button>
              <button type='button' className='btnSend'>Enviar</button>
              </div>
            </div>
          </form>

        </div>
      </section>
    </div>
  )
}

export default CrearSolicitud