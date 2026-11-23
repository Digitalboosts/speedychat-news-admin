import React, { useState } from "react";
import axios from "axios";
import { fetchTrendData } from "../../../redux/allApiCall/action";
import { useDispatch } from "react-redux";

const CsvUploader = () => {
  const [csvData, setCsvData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch()

  const handleCsvChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // if (file && file.type === "text/csv") {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     const csv = event.target.result;
    //     const rows = csv.split("\n").map((row) => row.split(","));
    //     setCsvData(rows);
    //   };
    //   reader.readAsText(file);
    // } else {
    //   alert("Please upload a valid CSV file.");
    // }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a CSV file.");
      return;
    }
    const prev_csv_path = localStorage.getItem("csv_path")

    const formData = new FormData();
    formData.append("files", selectedFile);
    formData.append("prev_csv_path", prev_csv_path);

    try {
      const response = await axios.post(
        "http://20.163.239.30:9033/expedichat/v0/upload/csv/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully!");
    //   console.log("shankar res", response.data.csv_path);
      localStorage.setItem("csv_path",response.data.csv_path)
      const payload = {
        "path":response.data.csv_path
      }
      const trendsData = await dispatch(fetchTrendData(payload))
    } catch (error) {
      alert("Error uploading the file.");
      console.error(error);
    }

    // Clear input and preview after submission
    setSelectedFile(null);
    setCsvData(null);
    document.getElementById("csvInput").value = ""; // Clear the input field
  };

  return (
    <div>
      <h4>Upload CSV</h4>
      <input
        id="csvInput"
        type="file"
        accept=".csv"
        onChange={handleCsvChange}
        // className={style.chooseButton}
      />

      {/* CSV preview container */}
      {/* <div>
        {csvData && (
          <table border="1">
            <thead>
              <tr>
                {csvData[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}

      {/* Submit button */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CsvUploader;
