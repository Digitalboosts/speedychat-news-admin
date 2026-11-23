import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from '@mui/icons-material/Article';
import CreateIcon from '@mui/icons-material/Create';

import ScienceIcon from '@mui/icons-material/Science';
import SportsIcon from '@mui/icons-material/Sports';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import BiotechIcon from '@mui/icons-material/Biotech';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import RssFeedIcon from '@mui/icons-material/RssFeed';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const rssFeeds = [
    {
      "category": "Science",
      "route": "/science",
      "icon": <ScienceIcon className="icon" />
    },
    {
      "category": "Scocial Media",
      "route": "/social-media",
      "icon": <SportsIcon className="icon" />
    },
    {
      "category": "Business",
      "route": "/business",
      "icon": <CameraIndoorIcon className="icon" />
    },
    {
      "category": "Technology",
      "route": "/technology",
      "icon": <BiotechIcon className="icon" />
    }
  ];
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ExpediNews</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">Create RSS Feed</p>
          <Link to="/create-rss" style={{ textDecoration: "none" }}>
            <li>
              <RssFeedIcon className="icon" />
              <span>Create Rss</span>
            </li>
          </Link>
          <Link to="/get-all-rss" style={{ textDecoration: "none" }}>
            <li>
              <RssFeedIcon className="icon" />
              <span>Get All Rss</span>
            </li>
          </Link>
          <div>
            <p className="title">RSS Feed</p>
            <ul>
              {rssFeeds.map((feed, index) => (
                <Link to={feed.route} key={index} style={{ textDecoration: "none" }}>
                  <li>
                    {feed.icon}
                    <span>{feed.category}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <p className="title">Summarize Articles</p>
          <Link to="/articles" style={{ textDecoration: "none" }}>
            <li>
              <ArticleIcon className="icon" />
              <span>Articles</span>
            </li>
          </Link>
          <p className="title">Generate Articles</p>
          <Link to="/generate-articles" style={{ textDecoration: "none" }}>
            <li>
              <CreateIcon className="icon" />
              <span>Write Articles</span>
            </li>
          </Link>
          
          <Link to="/trends-articles" style={{ textDecoration: "none" }}>
            <li>
              <CreateIcon className="icon" />
              <span>By Google Trends</span>
            </li>
          </Link>

          {/* <Link to="/schedul" style={{ textDecoration: "none" }}>
            <li>
              <CreateIcon className="icon" />
              <span>Scheduler</span>
            </li>
          </Link> */}
          <p className="title">Final Result</p>
          {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li> */}
          <Link to='/final-articles'  style={{ textDecoration: "none" }}>
            <li>
              <ArticleIcon className="icon" />
              <span>Articles</span>
            </li>
          </Link>
          <p className="title">Coupon Details</p>
          <Link to="/coupon" style={{ textDecoration: "none" }}>
            <li>
              <CreateIcon className="icon" />
              <span>Coupon Generator</span>
            </li>
          </Link>
          <Link to="/show-coupon" style={{ textDecoration: "none" }}>
            <li>
            <ArticleIcon className="icon" />
              <span> All Coupon</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
