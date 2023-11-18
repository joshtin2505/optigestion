import { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx'
import { useReq } from '../context/ReqContext.jsx'
import '../assets/css/Draft.css'
import {BsSearch, BsSquare, BsTrash, BsFolder} from 'react-icons/bs'
function Borrador() {
  const {getAllReq } = useReq()
  const [response ,setResponse] = useState()

  useEffect(() => {
    const fetchReq = async () => {
      const res = await getAllReq()
      setResponse(res)
    }
    fetchReq()
  },[])

  return (
<div className='back'>
      <Nav type={1}/>
      <div className="Br-real-cont">
        <form action="" className='search-form'>
          <BsSearch className='search-icon' fill='#6b6b6b' size={25}/>
          <input type="text" className='search-in'/>
        </form>
        <section className='Br-box-cont'>
          <div className="head">
            <div className="head1">
              <BsSquare className='Br-icon' fill='#6b6b6b' size={20}/>
              <BsTrash className='Br-icon' fill='#6b6b6b' size={20}/>
              <BsFolder className='Br-icon' fill='#6b6b6b' size={20}/>
            </div>
            <div className="head2">
              <h1 className='Br-title'>Borrador</h1>
            </div>
          </div>
          <hr />
          <div className='Br-cards-cont'>
            {
              response && response.map(req => {
                const fecha = new Date(req.date)
                const concatDate = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear() 

                return (
                  <div className='BrCard' key={req.id} >
                    <BsSquare className='Br-icon' fill='#6b6b6b' size={18}/>
                    <p>{concatDate}</p>
                    <p>{req.title}</p>
                    <span>-</span>
                    <p>{req.description}</p>
                  </div>
                )
              })
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default Borrador