import { useEffect } from 'react'
import Nav from '../components/Nav.jsx'
import { useReq } from '../context/ReqContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
function Borrador() {
  const {response: authRes} = useAuth()
  const {getAllReq, response} = useReq()

  useEffect(() => {
    getAllReq(authRes.idDB)
    //  quede por aqui, no me esta dando respuesta
    console.log(response)
  },[])

  return (
<div className='back'>
      <Nav type={1}/>
      <section className='CR-box-cont'>

      </section>
    </div>
  )
}

export default Borrador