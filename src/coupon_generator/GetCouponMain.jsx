import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import GetCoupon from "./GetCoupon";



const GetCouponMain = () => {
  
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
       <GetCoupon />
      </div>
    </div>
  );
};

export default GetCouponMain;