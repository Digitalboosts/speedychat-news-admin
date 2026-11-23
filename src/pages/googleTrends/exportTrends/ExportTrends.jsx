import React, { useState } from 'react';
import './exportTrends.scss'; // Import the CSS file
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CsvUploader from './CsvUploader';

const countryOptions = [{"country":"India","code":"IN"},{"country":"USA","code":"usa"},{"country":"Canada","code":"canada"},{"country":"UK","code":"uk"},{"country":"Australia","code":"australia"}];
const timeOptions = ["Past 24 hours", "Past Week", "Past Month"];
const statusOptions = ["Active only", "All"];
const sortOptions = ["By relevance", "By date"];

const ExportTrends = () => {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedTime, setSelectedTime] = useState("Past 24 hours");
  const [selectedStatus, setSelectedStatus] = useState("Active only");
  const [selectedSort, setSelectedSort] = useState("By relevance");
  const [selectedImage, setSelectedImage] = useState(null);
  const [featuredImage, setfeaturedImage] = useState(null);

  const handleExport = () => {
    const exportData = {
      country: selectedCountry,
      timeRange: selectedTime,
      status: selectedStatus,
      sortBy: selectedSort,
    };
    console.log("Exporting data with values: ", exportData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setfeaturedImage(file);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setfeaturedImage(null);
    }
  };


  return (
    <div className="trends-export-container">
      <div className='select-tag'>
        {/* Country Dropdown */}
        <select className="trends-dropdown" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            {countryOptions.map((item) => (
            <option key={item.code} value={item.code}>
                {item.country}
            </option>
            ))}
        </select>

        {/* Time Range Dropdown */}
        <select className="trends-dropdown" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            {timeOptions.map((time) => (
            <option key={time} value={time}>
                {time}
            </option>
            ))}
        </select>

        {/* Status Dropdown */}
        <select className="trends-dropdown" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            {statusOptions.map((status) => (
            <option key={status} value={status}>
                {status}
            </option>
            ))}
        </select>

        {/* Sort By Dropdown */}
        <select className="trends-dropdown" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
            {sortOptions.map((sort) => (
            <option key={sort} value={sort}>
                {sort}
            </option>
            ))}
        </select>
      </div>
      <CsvUploader/>

      {/* Export Button */}
      <div className="trends-export-box2">
        <button className="trends-export-btn" onClick={handleExport}>
            Export
        </button>
      </div>
    </div>
  );
};

export default ExportTrends;
