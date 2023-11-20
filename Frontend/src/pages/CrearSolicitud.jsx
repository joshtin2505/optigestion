import Nav from '../components/Nav.jsx'
import '../assets/css/CreateReq.css'
import {useForm} from 'react-hook-form'
import { useReq } from '../context/ReqContext.jsx'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
function CrearSolicitud() {
  
  
  



  return (
    <div className='back'>
      <Nav type={1}/>
      <section className='CR-box-cont'>
          <ReqForm typeForm/>

      </section>
    </div>
  )
}

export const ReqForm = ({typeForm, data}) => {
  const {createReq, updateReq} = useReq()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState:{
      errors
    },
    reset
  } = useForm()

  console.log(data)
 if (typeForm === true){
  const onSubmit = handleSubmit((values)=>{
    createReq(values)
    reset()
    onOpen()
  })

  return(
    <>
    <div className='CR-container'>
      <h2>Solicitud</h2>
      <form action="" onSubmit={onSubmit}>
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input type="text" {...register('title',{
            required: true,
            min: 5
          })}
          autoFocus />
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
      <Modal onClose={onClose} isOpen={isOpen} >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Solcitud Guardada</ModalHeader>
              <ModalBody>
                <Link style={{
                  "background": "#6b6b6b",
                  "padding": "8px 5px",
                  color: "#fff",
                  "borderRadius": "4px",
                }} to='/'>
                  Volver a Inicio
                </Link>
                <button style={{
                  "background": "#6b6b6b",
                  "padding": "8px 5px",
                  color: "#fff",
                  "borderRadius": "4px",
                  "margin": "10px"
                }} to='/'>
                  ver Solicitud
                </button>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
      </div>
    </>
  )
 }
 if (typeForm === false){
  const onSubmit = handleSubmit((values)=>{
    // updateReq(values)
    console.log(values)
    reset()
    onOpen()
  })

  return(
    <>
    <form action="" onSubmit={onSubmit}>
      <div className='head'>
        <label htmlFor="">Titulo:</label>
        <input type="text" value={data.title} {...register('title',{
          required: true,
          min: 5
        })}
        autoFocus />
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
      <textarea value={data.description} {...register('description', {
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
    <Modal onClose={onClose} isOpen={isOpen} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Solcitud Guardada</ModalHeader>
            <ModalBody>
              <Link style={{
                "background": "#6b6b6b",
                "padding": "8px 5px",
                color: "#fff",
                "borderRadius": "4px",
              }} to='/'>
                Volver a Inicio
              </Link>
              <button style={{
                "background": "#6b6b6b",
                "padding": "8px 5px",
                color: "#fff",
                "borderRadius": "4px",
                "margin": "10px"
              }} to='/'>
                ver Solicitud
              </button>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
    </>
  )
 }

}
export default CrearSolicitud