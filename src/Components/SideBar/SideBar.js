import React from 'react'
import "./sidebar.css"

import { Link } from 'react-router-dom'

const SideBar = () => {

  return (
    <div className='h-full flex flex-col '>
        <div className='sideBar-title-card h-20 flex justify-center items-center'>
            <p className='text-xl text-center md:2xl  font-black font-sans'>INVENTORY</p>
        </div>
        <div className='sidebar-links-card h-full pt-5 flex justify-center '>
            <nav className='sidebar-links  text-center w-full'>
                
                    <Link to="/home">
                       <li className='sideIcon mt-3 p-5 text-base md:text-xl font-bold '>Home</li>
                    </Link>
                    <Link to="/products">
                       <li className='sideIcon mt-3 p-5 text-base md:text-xl font-bold '>Products</li>
                    </Link>
                    <Link to="/additems">
                       <li className='sideIcon mt-3 p-5 text-base md:text-xl font-bold '>Add Items</li>
                    </Link>
                
            </nav>
        </div>
        
    </div>
  )
}

export default SideBar