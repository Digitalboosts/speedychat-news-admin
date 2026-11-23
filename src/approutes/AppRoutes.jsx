import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRssFeedUrl } from '../redux/allApiCall/action';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login.jsx";
import RssFeedList from "../pages/list/RssFeedList";
import CreateRssUrl from '../pages/list/CreateRssUrl.jsx';
import GetAllRSS from '../pages/rssFeedCrud/GetAllRSS/GetAllRSS';
import GetSummarize from '../pages/Summarizer/Getalldata/GetSummarize.jsx';
import GetFinalArticles from '../pages/finalArticles/getAllFinalArticles/GetFinalArticles.jsx';
import DisplayPlayGround from '../pages/playground/display/DisplayPlayGround.jsx';
import NotAuthorizedPage from '../pages/NotAuthorizedPage/NotAuthorizedPage.jsx';
import GoogleTrendsNews from '../pages/googleTrends/GoogleTrendsNews.jsx';
import RssTechnology from '../pages/list/RssTechnology.jsx';
import RssBusiness from '../pages/list/RssBusiness.jsx';
import RssScience from '../pages/list/RssScience.jsx';
import RssSocialMedia from '../pages/list/RssSocialMedia.jsx';
import MainCoupon from '../coupon_generator/MainCoupon.jsx';
import GetCouponMain from '../coupon_generator/GetCouponMain.jsx';
import ProArtiles from '../pages/finalArticles/getAllFinalArticles/ProArtiles.jsx';
import Scheduler from '../components/schedule/Scheduler.jsx';
import TaskList from '../components/schedule/TaskList.jsx';


const PrivateRoute = React.memo(({ roles, children }) => {
  const { allUserData } = useSelector((state) => state.Allapicall);
  // console.log("allUserData", allUserData)
  if (!allUserData) {
    return <div>Loading...</div>; // Return a loader while user data is being fetched
  }
  if (!allUserData?.email) {
    return <Navigate to="/login" replace />;
  }
  if (!roles.includes(allUserData.role)) {
    return <Navigate to="/not-authorized" replace />;
  }
  return children;
});

// Memoize AppRoutes to prevent unnecessary re-renders
const AppRoutes = React.memo(() => {
  const dispatch = useDispatch();
  const { allRssFeedsUrl } = useSelector((state) => state.Allapicall);
  // Private route logic memoized

  useEffect(() => {
    dispatch(getRssFeedUrl());
  }, [dispatch]);

  // Memoize filtered RSS feeds
  const scienceFeeds = useMemo(() => allRssFeedsUrl.filter(feed => feed.category === "science"), [allRssFeedsUrl]);
  const socialMediaFeeds = useMemo(() => allRssFeedsUrl.filter(feed => feed.category === "social trend"), [allRssFeedsUrl]);
  const businessFeeds = useMemo(() => allRssFeedsUrl.filter(feed => feed.category === "business"), [allRssFeedsUrl]);
  const technologyFeeds = useMemo(() => allRssFeedsUrl.filter(feed => feed.category === "technology"), [allRssFeedsUrl]);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<PrivateRoute roles={['admin', 'user']}><Home /></PrivateRoute>} />
        <Route path="create-rss" element={<PrivateRoute roles={['admin', 'user']}><CreateRssUrl /></PrivateRoute>} />
        <Route path="get-all-rss" element={<PrivateRoute roles={['admin']}><GetAllRSS /></PrivateRoute>} />
        <Route path="science" element={<RssScience rssFeeds={scienceFeeds} category="science"/>} />
        <Route path="social-media" element={<RssSocialMedia rssFeeds={socialMediaFeeds} category="Social Viral"/>} />
        <Route path="business" element={<RssBusiness rssFeeds={businessFeeds} category="business" />} />
        <Route path="technology" element={<RssTechnology rssFeeds={technologyFeeds} category="technology" />}/>
        {/* <Route path="articles" element={<GetSummarize />} /> */}
        <Route path="articles" element={<PrivateRoute roles={['admin']}><GetSummarize /></PrivateRoute>} />
        {/* <Route path="schedul" element={<PrivateRoute roles={['admin']}><TaskList/></PrivateRoute>} /> */}
        <Route path="final-articles" element={<PrivateRoute roles={['admin']}><GetFinalArticles /></PrivateRoute>} />
        {/* <Route path="final-articles" element={<GetFinalArticles />} /> */}
        <Route path="generate-articles" element={<PrivateRoute roles={['admin']}><DisplayPlayGround /></PrivateRoute>} />
        <Route path="trends-articles" element={<PrivateRoute roles={['admin']}> <GoogleTrendsNews />  </PrivateRoute>} />
        <Route path="coupon" element={<PrivateRoute roles={['admin']}> <MainCoupon/>  </PrivateRoute>} />
        <Route path="show-coupon" element={<PrivateRoute roles={['admin']}> <GetCouponMain/> </PrivateRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="/not-authorized" element={<NotAuthorizedPage />} /> {/* Add route for Not Authorized page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
});

export default AppRoutes;
