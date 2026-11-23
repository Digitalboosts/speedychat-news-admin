

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import CouponPage from "./CouponPage";

const MainCoupon = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <CouponPage />
      </div>
    </div>
  );
};

export default MainCoupon;