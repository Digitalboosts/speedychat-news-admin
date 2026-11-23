import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import PublishIcon from '@mui/icons-material/Publish';
import DraftsIcon from '@mui/icons-material/Drafts';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchFinalNewsAllData, fetchFinalNewsData } from "../../redux/allApiCall/action";

const Widget = ({ type }) => {
  const dispatch = useDispatch()
  const {allFinalNewsDashboardData} =  useSelector((state) => state.Allapicall);
  // const [loading, setLoading] = useState(true);
  // const [totalNes, setTotalNews] = useState(0)
  useEffect(() => {
    dispatch(fetchFinalNewsAllData()).finally(() => {
    });
  }, [dispatch]);

  // console.log("allFinalNewsDashboardData_shankar", allFinalNewsDashboardData.length)
  const publishedItem = allFinalNewsDashboardData.filter((item)=>{
    return item.status == "published"
  })

  // console.log("publishedItem", publishedItem)
  let data;

  var draftItem = allFinalNewsDashboardData?.length - publishedItem?.length

  var totalNesPer = (allFinalNewsDashboardData?.length/allFinalNewsDashboardData?.length)*100
  var publishedItemPer = (publishedItem?.length/allFinalNewsDashboardData?.length)*100
  var draftItemPer = (draftItem/allFinalNewsDashboardData?.length)*100

  //temporary
  const diff = 20;

  switch (type) {
    case "News":
      data = {
        title: "Total News Article",
        total: allFinalNewsDashboardData?.length,
        diff: totalNesPer,
        isMoney: false,
        link: "See all News",
        icon: (
          <RssFeedIcon
            className="icon"
            style={{
              color: "#5ac4b1",
              backgroundColor: "#b2d2cc",
            }}
          />
        ),
      };
      break;
    case "Published":
      data = {
        title: "Published Articles",
        total: publishedItem?.length,
        diff: publishedItemPer,
        isMoney: false,
        link: "View all Articles",
        icon: (
          <PublishIcon
            className="icon"
            style={{
              color: "#5ac4b1",
              backgroundColor: "#b2d2cc",
            }}
          />
        ),
      };
      break;
    case "Draft":
      data = {
        title: "Draft Articles",
        total: draftItem,
        diff: draftItemPer,
        isMoney: false,
        link: "View Drafts Articles",
        icon: (
          <DraftsIcon
            className="icon"
            style={{ color: "#5ac4b1",
              backgroundColor: "#b2d2cc"}}
          />
        ),
      };
      break;
    case "Scheduled":
      data = {
        title: "Scheduled Articles",
        total: 0,
        diff: 0,
        isMoney: false,
        link: "View Articles",
        icon: (
          <UnpublishedIcon
            className="icon"
            style={{
              color: "#5ac4b1",
              backgroundColor: "#b2d2cc",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {/* {data.isMoney && "$"} {amount} */}
          {data.total}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {/* {diff} % */}
          {data.diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
