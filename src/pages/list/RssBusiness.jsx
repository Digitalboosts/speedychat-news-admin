
import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ReaderApp from "../fetchRss/reader"

const RssBusiness = ({rssFeeds , category}) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ReaderApp  rssFeeds={rssFeeds}  category= {category}/>
      </div>
    </div>
  );
};

export default RssBusiness;
