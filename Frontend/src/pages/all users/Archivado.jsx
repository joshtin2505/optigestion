import { useEffect, useState } from 'react'
import Nav from '../../components/Nav.jsx'
import { useReq } from '../../context/ReqContext.jsx'
import '../../assets/css/File.css'
import {BsSearch, BsTrash, BsFolder} from 'react-icons/bs'
import {useForm} from 'react-hook-form'
import '../../assets/css/Extra.css'

function Archivado() {
  const {trashReq, fileReq, getAllFileReq } = useReq()
  const {register, setValue, watch} = useForm()
  const [response ,setResponse] = useState([])
  const [updateComponent, setUpdateComponent] = useState(0)

  const search = watch('search')

  useEffect(() => {
    const fetchReq = async () => {
      const res = await getAllFileReq()
      setResponse(res?.data)
    }

    fetchReq()
  },[updateComponent])
  function handleSubmit(e){
    e.preventDefault()
  }

  const filteredResponse = response?.filter((req) => {
    return (
      req?.titulo.toLowerCase().includes(search.toLowerCase()) ||
      req?.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      req?.tipoRequerimiento.titulo.toLowerCase().includes(search.toLowerCase()) ||
      req?.tipoRequerimiento.descripcion.toLowerCase().includes(search.toLowerCase())
    )
  })
  const toTrash = (id) => {
    trashReq(id)
    setUpdateComponent(prevValue => prevValue + 1)
  }
  const toRestore = (id) => {
    fileReq(id)
    setUpdateComponent(prevValue => prevValue + 1)
  }

  return (
<div className='back'>
      <Nav type={1}/>
      <div className="Ar-real-cont">
        <form onSubmit={handleSubmit} action="" className='search-form'>
          <BsSearch className='search-icon' fill='#6b6b6b' size={25}/>
          <input type="text" {...register('search')} autoFocus onChange={(e) => setValue('search', e.target.value)} className='search-in'/>
        </form>
        <section className='Ar-box-cont'>
          <div className="head">

              <h1 className='Ar-title'>Archivado</h1>

          </div>
          <hr />
          <div className='Ar-cards-cont'>
            {
              filteredResponse && 
              filteredResponse.map(req => {
                const fecha = new Date(req.fecha_creacion)
                const concatDate = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear() 
                return (
                  <div className='ArCard' key={req.id_requerimeinto} >

                    <div className="Ar-card-txt">
                      <p>{concatDate}</p>
                      <p>|</p>
                      <p className='card-title'>{req.titulo}</p>
                      <span>-</span>
                      <p className='card-description'>{req.descripcion}</p>
                    </div>
                    <div className="Ar-options">
                      <BsFolder onClick={() =>{
                         toRestore(req.id_requerimeinto)
                        setUpdateComponent(prevValue => prevValue + 1)
                      }} className='Ar-icon' fill='#6b6b6b' size={18}/>
                      <BsTrash onClick={() =>{
                         toTrash(req.id_requerimeinto)
                         setUpdateComponent(prevValue => prevValue + 1)
                      }} className='Ar-icon' fill='#6b6b6b' size={18}/>
                    </div>
                  </div>
                )
              })
            }
            {
              filteredResponse.length === 0  &&
              <div className='ArCard'>
                <div className="Ar-card-txt" style={{
                  "display": "flex",
                  "justifyContent": "center",
                  "fontWeight": "bold",
                }}>
                  <p>No hay Solicitudes</p>
                </div>
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  )
}


export default Archivado