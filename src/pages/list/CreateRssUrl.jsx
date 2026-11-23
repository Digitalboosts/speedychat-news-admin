import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import RSSForm from "../rssFeedCrud/CreateRSS/createRssFeed"


const CreateRssUrl = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <RSSForm />
      </div>
    </div>
  )
}

export default CreateRssUrl