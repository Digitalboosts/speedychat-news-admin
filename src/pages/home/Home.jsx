import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import ExportTrends from "../googleTrends/exportTrends/ExportTrends";
import TrendsTable from "../googleTrends/TrendsTable/TrendsTable";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="News" />
          <Widget type="Published" />
          <Widget type="Draft" />
          <Widget type="Scheduled" />
        </div>
        
        <div>
          {/* <img width="100%" src="https://expedblobstorage.blob.core.windows.net/permanentimages/1704c700-38c4-49ed-be9f-35ad6b6a3431?se=2138-09-26T02%3A45%3A30Z&sp=r&sv=2023-11-03&sr=b&sig=gdNqqWwA9Fg1M7hEBT0nSs8Uo%2BdHWRhPC4iwASDSSWQ%3D" alt="trends"></img> */}
          {/* <ExportTrends/> */}
          <TrendsTable limit={5} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
        <div className="charts">
          <Featured />
          <Chart title="Todays Most Popular Articles" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
