import React, { useEffect, useState } from 'react';
import './TrendsTable.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendData, generateGoogleNews } from '../../../redux/allApiCall/action';
import ExportTrends from '../exportTrends/ExportTrends';
import { useNavigate } from 'react-router-dom';

// Sample data
const data = [{
  Trends: "aditi rao hydari",
  "Search volume": "100K+",
  Started: "16 September 2024 at 11:30:00 UTC+5:30",
  "Trend breakdown": [
    "aditi rao hydari", "siddharth", "aditi rao", "aditi", "siddharth (actor)",
    "siddharth age", "aditi rao hydari age", "aditi rao hydari husband",
    "satyadeep mishra", "siddharth first wife", "wanaparthy", "siddharth actor",
    "actor siddharth", "siddharth wife", "meghna narayan", "sonakshi sinha"
  ]
}];

// Function to calculate time difference and return "X hours ago"
const timeAgo = (startedTime) => {
  const startDate = new Date(startedTime);
  const currentDate = new Date();
  // console.log("currentDate",currentDate)
  const diffInMilliseconds = currentDate - startDate;
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // console.log("diffInHours", diffInHours)
  // console.log("diffInHours", diffInHours)
  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};

const TrendsTable = ({ limit }) => {
  // console.log("limit", limit)
  const [loading, setLoading] = useState(null); // Track which row is loading
  const [mappedData, setMappedData] = useState([]);
  const { allTrendsData } = useSelector((state) => state.Allapicall);
  const dispatch = useDispatch()
  const navigate = useNavigate();


  useEffect(() => {
    const fetchTrendsData = async () => {
      // console.log("allTrendsData", allTrendsData)
      const csv_path = localStorage.getItem("csv_path")
      const payload = {
        "path" : csv_path
      }
      const trendsData = await dispatch(fetchTrendData(payload))
      // console.log("trendsData", typeof(allTrendsData))
      // const data2 =  await typeof trendsData === 'string' ? JSON.parse(allTrendsData) : allTrendsData;

      // setMappedData(top5Data) 

    }
    fetchTrendsData()
  }, [])
  // Handle button click
  const handleButtonClick = async (item, index) => {
    try {
      setLoading(index)
      const data = {
        "query": item?.Trends,
        "short_by": "shankar"
      }
      await dispatch(generateGoogleNews(data))
      await navigate('/articles')

    } catch (error) {   
      console.log("error", error)
      setLoading(null)
    }
  };
  const top5Data = allTrendsData?.slice(0, limit);
  return (
    <>
      <ExportTrends />
      <div className="table-container">
        <table className="trends-table">
          <thead>
            <tr>
              <th>Trends</th>
              <th>Search volume</th>
              <th>Started</th>
              <th>Trend breakdown</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {top5Data?.map((item, index) => (
              <tr key={index}>
                <td>{item.Trends}</td>
                <td>{item["Search volume"]}</td>
                <td>{item.Started}</td>
                <td>
                  <div className="trend-breakdown">
                    {item["Trend breakdown"].slice(0, 4).map((term, i) => (
                      <span key={i} className="breakdown-item">
                        {term}
                      </span>
                    ))}
                    {item["Trend breakdown"].length > 4 &&
                      <span className="more">+{item["Trend breakdown"].length - 4} more</span>
                    }
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleButtonClick(item, index)}
                    disabled={loading === index}
                    className={loading === index ? 'loading-button' : 'action-button'}
                  >
                    {loading === index ? 'Loading...' : 'Generate news'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TrendsTable;
