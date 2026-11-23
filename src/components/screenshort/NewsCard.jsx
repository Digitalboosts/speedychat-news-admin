import React, { useRef } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

export const NewsCard = ({ data }) => {
  const cardRef = useRef();

  const handleDownload = () => {
    if (cardRef.current) {
      toPng(cardRef.current, { quality: 1 })
        .then((dataUrl) => {
          saveAs(dataUrl, "news-card.png");
        })
        .catch((error) => {
          console.error("Error capturing screenshot:", error);
        });
    }
  };

  return (
    <div>
      <div
        ref={cardRef}
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          maxWidth: "400px",
          fontFamily: "Arial, sans-serif",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src={data.imageUrl}
          alt="News"
          style={{ width: "100%", borderRadius: "8px 8px 0 0" }}
          crossOrigin="anonymous"
          onError={(e) => {
            e.target.src = data.imageUrl
          }}
        />
        <div style={{ marginTop: "8px" }}>
          <h4 style={{ margin: "0", color: "#333" }}>{data.title}</h4>
          <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
            {data.subtitle}
          </p>
          <p style={{ margin: "4px 0", fontSize: "12px", color: "#999" }}>
            {data.timestamp}
          </p>
        </div>
      </div>
      <button
        onClick={handleDownload}
        style={{
          marginTop: "16px",
          padding: "8px 16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Save Screenshot
      </button>
    </div>
  );
};

// export default function App() {
//   const cardData = {
//     imageUrl: "https://via.placeholder.com/400x200",
//     title: "Breaking News: Elections",
//     subtitle: "Supreme Court advises respectful behavior in the Bihar assembly",
//     timestamp: "3 hours ago",
//   };

//   return (
//     <div style={{ padding: "16px" }}>
//       <NewsCard data={cardData} />
//     </div>
//   );
// }
