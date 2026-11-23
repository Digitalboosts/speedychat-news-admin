
import './getFinalArticle.scss';
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ProDbArticles from "../productionDB/ProDbArticles";
import { fetchFinalNewsData } from "../../../redux/allApiCall/action";
import { useDispatch, useSelector } from 'react-redux';

const ProArtiles = (rssFeeds) => {
    const dispatch = useDispatch()
    const {allFinalNewsData} =  useSelector((state) => state.Allapicall);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      dispatch(fetchFinalNewsData()).finally(() => {
          setLoading(false);
      });
    }, [dispatch]);
  
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {loading ? (
                    <p>Loading...</p> // Display a loading message or spinner
                ) : (
                   <ProDbArticles data = {allFinalNewsData}/>
                )}
      </div>
    </div>
  );
};

export default ProArtiles;
