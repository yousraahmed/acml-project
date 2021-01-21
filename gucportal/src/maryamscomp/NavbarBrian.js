import React, {useState} from 'react'
// import { FaIcons } from 'react-icons/fa';
// import { AiOutlineClose } from 'react-icons/ai';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

//brian step: to be able to use Link below
//you can't use Link without Router, so we'll go to App.js and we'll 
//wrap <Navbar/> with <Router> </Router>
import {Link} from 'react-router-dom'

import {SidebarDataBrian} from './SidebarDataBrian'

//importing the css file NavbarBrian.css
import './NavbarBrian.css';
//importing icon styles
import {IconContext} from 'react-icons'



function NavbarBrian() {
    const[sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
        <IconContext.Provider value={{color:'pink'}}>
          <div className="navbar">
              <Link to="#" className='menu-bars'>
                  <FaIcons.FaBars onClick={showSidebar}/>
              </Link>
              
            </div>  
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='navbar-menu-items' onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                        
                    </li>
                    {SidebarDataBrian.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                        
                    })}

                </ul> 
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default NavbarBrian
