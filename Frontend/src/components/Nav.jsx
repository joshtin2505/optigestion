import {IoIosLogOut} from 'react-icons/io'
import { Link } from "react-router-dom"
import '../assets/css/Nav.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Switch,
    FormLabel,
    FormControl,
  } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
function NavBar({type = 0}) {
    const {response} = useAuth()
    if (type === 0) {
        return <UnLoget/>
    }
    else if (type === 1) {
        return <Loget user={response.roll}/>
    }

}
function Loget({user = 1}){
    const {logOut} = useAuth()
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

                        <Menu>
                            <MenuButton className="menu-btn">
                                Opciones
                            </MenuButton>
                            <MenuList className="menu-list">
                                <MenuItem className="menuLi">
                                <FormControl display='flex' alignItems='center'>
                                    <FormLabel htmlFor='email-alerts' mb='0'>
                                        Cambiar Modo
                                    </FormLabel>
                                    <Switch id='email-alerts' />
                                    </FormControl>
                                </MenuItem>
                                <MenuItem className="menuLi">
                                    <Link to='/profile'>Mis datos</Link>
                                </MenuItem>
                                {
                                    user === 0 && (
                                        <MenuItem className="menuLi">
                                            <Link to='/register'>Registrar usuario</Link>
                                        </MenuItem>
                                    )
                                }
                                <MenuItem onClick={logOut} className="menuLi">
                                    <span>LogOut</span>
                                    -
                                    <IoIosLogOut size={20}/>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </ul>
                
            </nav>
        </header>
    )
}
function UnLoget(){
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
                    </ul>
                
            </nav>
        </header>
    )
}


export default NavBar