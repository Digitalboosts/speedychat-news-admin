import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import TrendsTable from './TrendsTable/TrendsTable'

const GoogleTrendsNews = () => {
  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar />
    <TrendsTable limit={25}/>
    </div>
  </div>
  )
}

export default GoogleTrendsNews