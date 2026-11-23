
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import './getFinalArticle.scss';
import { useEffect, useState } from "react";
import { fetchFinalNewsAllData, fetchFinalNewsData } from "../../../redux/allApiCall/action";
import FinalNewsCard from "./FinalNewsCard";

const GetFinalArticles = (rssFeeds) => {
    const dispatch = useDispatch()
    const {allFinalNewsData} =  useSelector((state) => state.Allapicall);
    // const {allFinalNewsDashboardData} =  useSelector((state) => state.Allapicall);
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
                    <FinalNewsCard data={allFinalNewsData} />
                )}
      </div>
    </div>
  );
};

export default GetFinalArticles;
