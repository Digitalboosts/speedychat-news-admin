import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

Modal.setAppElement("#root");

const PosterGenerator1 = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const posterRef = useRef(null);

  const handleGenerateImage = async () => {
    if (posterRef.current) {
      const dataUrl = await toPng(posterRef.current);
      saveAs(dataUrl, "poster.png");
      console.log("Image generated!");
    }
  };

  console.log("data", data)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Poster Modal"
        style={{ overlay: { zIndex: 1000 }, content: { width: "800px", margin: "auto" } }}
      >
        <div ref={posterRef} style={{ width: "100%", padding: "20px", background: "#fff", textAlign: "center", position: "relative" }}>
          <h2 style={{ backgroundColor: "red", color: "white", padding: "10px" }}>BREAKING NEWS</h2>
          <img
            src= {data.featured_image} // Replace with your image URL
            alt="Poster"
            style={{ width: "100%", height: "auto" }}
          />
          <div style={{ padding: "10px", background: "#FFD700" }}>  
            <h3 style={{ color: "darkred" }}>{data.summary_dict.title}</h3>
            <p>{data.summary_dict.summary}</p>
          </div>
        </div>
        
        <button onClick={handleGenerateImage}>Publish</button>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default PosterGenerator1;
