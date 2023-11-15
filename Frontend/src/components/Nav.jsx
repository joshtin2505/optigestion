import { BsMoon, BsMoonFill } from "react-icons/bs"
import { useState } from "react"
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <header>
        <nav>
            <div className='logo-container'>
                <img className='logo' src="/src/assets/Logo.png" alt="" />
            </div>
                <ul className="nav-options">
                    <li>
                    <Link to='/'>Inicio</Link>
                    </li>
                    <li>
                    <Link to='/help'>Ayuda</Link>
                    </li>
                    <DarkModeIcon/>
                </ul>
            
        </nav>
    </header>
    )
}

function DarkModeIcon(){
    const [darkModeHover, setDarkModeHover] = useState(false)
    const [mode, setMode] = useState(true)
    return (
        <li 
            onMouseOver={() =>setDarkModeHover(true)
            }
            onMouseOut={
                () =>setDarkModeHover(false)
            }
        >
            {
                darkModeHover ?
                <BsMoonFill/>
                :
                <BsMoon/>
            }
        </li>
    )
}

export default NavBar