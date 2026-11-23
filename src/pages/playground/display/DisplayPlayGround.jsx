import React from 'react'
import { Add } from '../Add/Add.jsx'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import './display.scss'

const DisplayPlayGround = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Add/> 
      </div>
    </div>
  )
}

export default DisplayPlayGround