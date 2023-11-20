import { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx'
import { useReq } from '../context/ReqContext.jsx'
import '../assets/css/Trash.css'
import {BsSearch, BsTrash, BsArrowClockwise} from 'react-icons/bs'
import {useForm} from 'react-hook-form'
 
function Papelera() {
  const {deleteReq, trashReq, getAllTrashReq } = useReq()
  const {register, setValue, watch} = useForm()
  const [response ,setResponse] = useState([])
  const [updateComponent, setUpdateComponent] = useState(0)

  const search = watch('search')

  useEffect(() => {
    const fetchReq = async () => {
      const res = await getAllTrashReq()
      setResponse(res)
    }

    fetchReq()
  },[updateComponent])
  function handleSubmit(e){
    e.preventDefault()
  }

  const filteredResponse = response.filter((req) => {
    return (
      req.title.toLowerCase().includes(search.toLowerCase()) ||
      req.description.toLowerCase().includes(search.toLowerCase())
    )
  })
  const toDelete = (id) => {
    deleteReq(id)
    setUpdateComponent(prevValue => prevValue + 1)
  }
  const toRestore = (id) => {
    trashReq(id)
    setUpdateComponent(prevValue => prevValue + 1)
  }

  return (
<div className='back'>
      <Nav type={1}/>
      <div className="Tr-real-cont">
        <form onSubmit={handleSubmit} action="" className='search-form'>
          <BsSearch className='search-icon' fill='#6b6b6b' size={25}/>
          <input type="text" {...register('search')} autoFocus onChange={(e) => setValue('search', e.target.value)} className='search-in'/>
        </form>
        <section className='Tr-box-cont'>
          <div className="head">

              <h1 className='Tr-title'>Papelera</h1>

          </div>
          <hr />
          <div className='Tr-cards-cont'>
            {
              filteredResponse && 
              filteredResponse.map(req => {
                const fecha = new Date(req.date)
                const concatDate = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear() 
                return (
                  <div className='TrCard' key={req._id} >

                    <div className="Tr-card-txt">
                      <p>{concatDate}</p>
                      <p>|</p>
                      <p>{req.title}</p>
                      <span>-</span>
                      <p>{req.description}</p>
                    </div>
                    <div className="Tr-options">
                      <BsArrowClockwise onClick={() =>{
                         toRestore(req._id)
                      }} className='Tr-icon' fill='#6b6b6b' size={18}/>
                      <BsTrash onClick={() =>{
                         toDelete(req._id)
                      }} className='Tr-icon' fill='#6b6b6b' size={18}/>
                    </div>
                  </div>
                )
              })
            }
            {
              filteredResponse.length === 0  &&
              <div className='TrCard'>
                <div className="Tr-card-txt" style={{
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


export default Papelera