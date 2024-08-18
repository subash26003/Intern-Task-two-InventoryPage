import React from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import "./layout.css"



const HomePage = () => {

    


  
  return (
    <div className='grid grid-cols-12 w-screen border-2 h-screen'>
        <div className=' h-full col-start-1 col-end-4 lg:col-end-3 overflow-hidden'>
            <SideBar />
        </div>
        <div className=' col-start-4 col-end-13 lg:col-start-3 overflow-auto'>
            <div className='home-heading-card  h-20 flex items-center fixed  w-11/12 m-auto'>
                {/* <input className='home-input-element h-9 w-6/12 md:w-4/12 rounded m-auto outline-none hover:ring-2 hover:ring-white focus:ring-2 focus:ring-white' 
                    placeholder='Search'
                /> */}
                {/* <button className=' button-element ml-auto mr-4 md:mr-10'>Home</button> */}
            </div>
            <div className='components-card w-full'>
                <Outlet />
            </div>
        </div>
        
    </div>
  )
}

export default HomePage


