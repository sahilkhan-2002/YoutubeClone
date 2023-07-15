import React from 'react'
import Sidebar from './Sidebar'
import MainContainer from './Main'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='flex'>
     <Sidebar/> 
     <Outlet/>
    </div>
  )
}

export default Body
