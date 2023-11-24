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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import { BsCloudUpload, BsDownload } from 'react-icons/bs'
import '../assets/css/Approved.css'
import '../assets/css/ToQuote.css'

export const CreateReqForm = () => {
    const {createReq, sendInNewReq} = useReq()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sendSuccess, setSendSuccess] = useState(false)
    const {
      register,
      handleSubmit,
      formState:{
        errors
      },
      reset,
      setValue,
      watch
    } = useForm()
  
   
    const onSubmit = handleSubmit((values)=>{
      createReq(values)
      reset()
      onOpen()
    })
    const onSend = () => {
      const title = watch('title')
      const description = watch('description')
      sendInNewReq({
        title,
        description,
      })
      reset()
      setSendSuccess(true)
    }
  
    if(sendSuccess === true){
      setTimeout(() => {
        setSendSuccess(false)
      },5000)
    }
    return(
      <>
      <div className='CR-container'>
        <h2>Solicitud</h2>
        <form className='form-Create formTwo' action="" onSubmit={onSubmit}>
          <div className='head'>
            <label htmlFor="">Titulo:</label>
            <input type="text" {...register('title',{
              required: true,
              min: 5
            })}
            onChange={(e) => setValue('title', e.target.value)}
            autoFocus />
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
          })}
          onChange={(e) => setValue('description', e.target.value)}
          ></textarea>
          {
            errors.description && (
              <div className="error">Se necita una descripción</div>
            )
          }
          <div>
            <div className="btnOptions">
            <button type='reset' className='btnClear'>Limpiar Campos</button>
            <button type='submit' className='btnSave'>Guardar</button>
            <button type='button' onClick={onSend} className='btnSend'>Enviar</button>
            </div>
          </div>
        </form>
        {
          sendSuccess && (
            <Alert status='success'>
              <AlertIcon />
              <AlertTitle>Solicitud Enviada!</AlertTitle>
              <AlertDescription>Tu Solicitud ha sido enviada con exito.</AlertDescription>
            </Alert>
          )
        }
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
                  <Link style={{
                    "background": "#6b6b6b",
                    "padding": "8px 5px",
                    color: "#fff",
                    "borderRadius": "4px",
                    "margin": "10px"
                  }} to='/req-draft'>
                    ver Solicitud
                  </Link>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </ModalContent>
            </Modal>
        </div>
      </>
    )
   
  
   
  }
  export const UpdateReqForm = (data) => {
    const {updateReq, sendSavedReq} = useReq()
    const [inValues, setInValues] = useState({
      title: data.data.title,
      description: data.data.description
    })
    const {
      register,
      handleSubmit,
      formState:{
        errors
      },
      setValue,
      watch
    } = useForm()
  
    const onSubmit = handleSubmit((values)=>{
      updateReq({id :data.data._id,...values})
    })
    const onSend = () => {
      sendSavedReq(data.data._id)
    }
    const handleChange = (e) => {
      const title = watch('title')
      const description = watch('description')
      setInValues({
        title,
        description
      })
    }
    return(
      <>
      <form className='form-Update formTwo' onChange={handleChange}  onSubmit={onSubmit}>
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input 
          type="text" 
          onChange={(e) => setValue('title', e.target.value)} 
          value={inValues.title} 
          {...register('title',{
            required: true,
            min: 5
          })}
          autoFocus 
          />
        </div>
        {
          errors.title && (
            <div className="error">Se necita un titulo </div>
          )
        }
        <br />
        <label htmlFor="">Descripcion:</label>
        <br />
        <textarea 
        onChange={(e) => {setValue('description', e.target.value)}}
        value={inValues.description} 
        {...register('description', {
          required: true
        })} ></textarea>
        {
          errors.description && (
            <div className="error">Se necita una descripción</div>
          )
        }
        <div>
          <div className="btnOptions">
          <button type='submit' className='btnSave'>Guardar</button>
          <button type='button' onClick={onSend} className='btnSend'>Enviar</button>
          </div>
        </div>
      </form>
      
      </>
    )
  }
  export const ResReqForm = (data) => {
    const {sendRectorRes, } = useReq()
    const [inValues, setInValues] = useState()
    const {
      setValue,
      watch
    } = useForm()
  
    const onApprove = ()=> {
      sendRectorRes({id :data.data._id,rectorComment:inValues, res: 1})
    }
    const onReject = () => {
      sendRectorRes({id :data.data._id,rectorComment:inValues, res: 0})
    }
    const handleChange = (e) => {
      const rectorComment = watch('rectorComment')
      setInValues(rectorComment)
    }
    return(
      <>
      <form className='form-Update formTwo' onChange={handleChange}>
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input 
          type="text" 
          value={data.data.title} 
          disabled 
          />
        </div>

        <br />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }} className="body">

          <label style={{
            width: 'auto',
            textalign: 'start',
          }} htmlFor="">Descripcion:</label>
          <textarea style={{
            height: 'auto',
          }}
          className='textarea-Res '
          value={data.data.description} 
          disabled
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }} className="body">

          <label style={{
            width: 'auto',
            textalign: 'start',
          }} htmlFor="">Comentarios:</label>
          <textarea style={{
            height: 'auto',
          }}
          className='textarea-Res '
          onChange={(e) => {setValue('rectorComment', e.target.value)}}
          autoFocus
          />
        </div>

        <div>
          <div className="btnOptions">
            <button type='button' onClick={onReject} className='btnSend'>Rechazar</button>
            <button type='button' onClick={onApprove} className='btnSave'>Aprobar</button>
          </div>
        </div>
      </form>
      
      </>
    )
  }
  export const ToQuoteResForm = (data) => {

    const [pdfs, setPdfs] = useState([null, null, null])
    const [fileNames, setFileNames] = useState(['No hay archivos cargados', 'No hay archivos cargados', 'No hay archivos cargados'])
    const {LogisticRes} = useReq()
    
    const handleFileChange = (index, files) => {
      if (files[0]) {
        setFileNames((prevNames) => {
          const newNames = [...prevNames]
          newNames[index] = files[0].name
          return newNames
        })
        setPdfs((prevPdfs) => {
          const newPdfs = [...prevPdfs]
          newPdfs[index] = files[0]
          return newPdfs
        })
      }
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    const [pdf1, pdf2, pdf3] = pdfs
    if (pdf1 || pdf2 || pdf3) {
      const formData = new FormData()


      formData.append('id', data.data._id)
      pdf1 && formData.append('pdf1', pdf1)
      pdf2 && formData.append('pdf2', pdf2)
      pdf3 && formData.append('pdf3', pdf3)

      LogisticRes(formData)
    }
  }

    return(
      <>
      <form encType="multipart/form-data" className='form-Update formTwo' onSubmit={handleSubmit}>
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input 
          type="text" 
          value={data.data.title} 
          disabled 
          />
        </div>

        <br />
        <section className="TQ-content">
          <div className="TQ-Description-cont">

            <label style={{
              width: 'auto',
              textalign: 'start',
            }} htmlFor="">Descripcion:</label>
            <textarea style={{
              height: 'auto',
            }}
            className='textarea-Res '
            value={data.data.description} 
            disabled
            />
            </div>
            <div className="TQ-RectorComments-cont">

            <label style={{
              width: 'auto',
              textalign: 'start',
            }} htmlFor="">Comentarios:</label>
            <textarea style={{
              height: 'auto',
            }}
            value={data.data.rectorComment}
            className='textarea-Res'
            disabled
            />
          </div>
        </section>
        {/*  */}
        <div>
          <h1>Cotizacones</h1>
          <hr />
          <section className='TQ-middle-section'>
          {[0, 1, 2].map((index) => (
            <div className='TQ-toQuote-Box' key={index}>
              <div
                className='TQ-btn-pdf-cont'
                onClick={() => document.querySelector(`.option${index + 1}In`).click()}
              >
                <h5 className='TQ-title-op'>{`Opcion ${index + 1}`}</h5>
                <input
                  type='file'
                  accept='.pdf'
                  className={`option${index + 1}In`}
                  hidden
                  multiple={false}
                  onChange={({ target: { files } }) => handleFileChange(index, files)}
                  name={`pdf${index + 1}`}
                />
                <BsCloudUpload fill='#ececec' size={50} />
                <p className='TQ-pdf-name'>{fileNames[index]}</p>
              </div>
            </div>
          ))}
        </section>
          {/*  */}
          
        </div>
        {/*  */}
        <div className='TQ-btnCont'>
          <div className="TQ-btnOptions">
            <button type='submit' className='TQ-btnSend'>Enviar</button>
          </div>
        </div>
      </form>
      
      </>
    )
  }
  export const ViewApprovedResForm = (data) => {
    const {sendRectorRes, } = useReq()
    const [inValues, setInValues] = useState()
    const {
      setValue,
      watch
    } = useForm()
  
    const onApprove = ()=> {
      sendRectorRes({id :data.data._id,rectorComment:inValues, res: 1})
    }
    const onReject = () => {
      sendRectorRes({id :data.data._id,rectorComment:inValues, res: 0})
    }
    const handleChange = (e) => {
      const rectorComment = watch('rectorComment')
      setInValues(rectorComment)
    }
    return(
      <>
      <form className='form-Update formTwo' onChange={handleChange}>
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input 
          type="text" 
          value={data.data.title} 
          disabled 
          />
        </div>

        <br />
        <section className="A-content">
          <div className="A-Description-cont">

            <label style={{
              width: 'auto',
              textalign: 'start',
            }} htmlFor="">Descripcion:</label>
            <textarea style={{
              height: 'auto',
            }}
            className='textarea-Res '
            value={data.data.description} 
            disabled
            />
            </div>
            <div className="A-RectorComments-cont">

            <label style={{
              width: 'auto',
              textalign: 'start',
            }} htmlFor="">Comentarios:</label>
            <textarea style={{
              height: 'auto',
            }}
            value={data.data.rectorComment}
            className='textarea-Res'
            disabled
            />
          </div>
        </section>
        {/*  */}
        <div>
          <h1>Cotizacones</h1>
          <hr />
          <section className='A-middle-section'>
            <div className="A-toQuote-Box">
              <h5 className='A-title-op'>Opcion 1</h5>
              <p className='A-pdf-name'>Pdf Name.pdf</p>
              <div className='A-btn-pdf-cont'>
                <button className='A-btn-view' type='button'>Ver</button>
                <button className='A-btn-download' type='button'>
                  <BsDownload size={20} fill='#fff'/>
                </button>
              </div>
            </div>
            <div className="A-toQuote-Box">
              <h5 className='A-title-op'>Opcion 2</h5>
              <p className='A-pdf-name'>Pdf Name.pdf</p>
              <div className='A-btn-pdf-cont'>
                <button className='A-btn-view' type='button'>Ver</button>
                <button className='A-btn-download' type='button'>
                  <BsDownload fill='#fff'/>
                </button>
              </div>
            </div>
            <div className="A-toQuote-Box">
              <h5 className='A-title-op'>Opcion 3</h5>
              <p className='A-pdf-name'>Pdf Name.pdf</p>
              <div className='A-btn-pdf-cont'>
                <button className='A-btn-view' type='button'>Ver</button>
                <button className='A-btn-download' type='button'>
                  <BsDownload fill='#fff'/>
                </button>
              </div>
            </div>
          </section>
          {/*  */}
          <section className='A-down-section'>
            <h5 className='A-operative-comments-txt'>Comentarios: </h5>
            <textarea className='A-operative-comments-in' />
            <div className='A-chose-cont'>
              <h6 className='A-chose-title'>Elige</h6>
                <div className='A-chose-option'>
                  <input className='A-radio-chose' type="radio" name='opciones' value='1'/>
                  <span className='A-chose-opt-txt'>Opcion 1</span>
                </div>
                <div className='A-chose-option'>
                  <input className='A-radio-chose' type="radio" name='opciones' value='2'/>
                  <span className='A-chose-opt-txt'>Opcion 2 </span>
                </div>
                <div className='A-chose-option'>
                  <input className='A-radio-chose' type="radio" name='opciones' value='3'/>
                  <span className='A-chose-opt-txt'>Opcion 3</span>
                </div>
            </div>
          </section>
        </div>
        {/*  */}
        <div className='A-btnCont'>
          <div className="A-btnOptions">
            <button type='button' onClick={onReject} className='A-btnClear'>Limpiar Campos</button>
            <button type='button' onClick={onApprove} className='A-btnSend'>Enviar</button>
          </div>
        </div>
      </form>
      
      </>
    )
  }
  export const ViewRejectedResForm = (data) => {

    return(
      <>
      <form className='form-Update formTwo'>
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input 
          type="text" 
          value={data.data.title} 
          disabled 
          />
        </div>

        <br />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }} className="body">

          <label style={{
            width: 'auto',
            textalign: 'start',
          }} htmlFor="">Descripcion:</label>
          <textarea style={{
            height: 'auto',
          }}
          className='textarea-Res '
          value={data.data.description} 
          disabled
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }} className="body">

          <label style={{
            width: 'auto',
            textalign: 'start',
          }} htmlFor="">Comentarios:</label>
          <textarea style={{
            height: 'auto',
          }}
          className='textarea-Res '
          disabled
          value={data.data.rectorComment} 
          />
        </div>
      </form>
      
      </>
    )
  }
  export const ViewReqForm = (data) => {
  
    return(
      <>
      <form className='form-view formTwo'>
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input
          disabled 
          value={data.data.title} 
          />
          <label htmlFor="">Estado:</label>
        </div>
        <br />
        <label htmlFor="">Descripcion:</label>
        <br />
        <textarea 
        disabled 
        value={data.data.description} 
        ></textarea>
      </form>
      
      </>
    )
  }