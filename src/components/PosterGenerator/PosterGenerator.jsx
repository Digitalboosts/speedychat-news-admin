import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import './PosterGenerator.scss';
import { useDispatch } from "react-redux";
import { postImageonFbPage } from "../../redux/allApiCall/action";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const PosterGenerator = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const posterRef = useRef(null);
  const dispatch = useDispatch();

  const base64ToBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };
  
  const saveBase64AsFile = (base64Data, fileName) => {
    const blob = base64ToBlob(base64Data.split(",")[1], "image/png");
    const file = new File([blob], fileName, { type: "image/png" });
    return file;
  };
  
  

  // const handleGenerateImage = async () => {
  //   // event.preventDefault();
  //   if (posterRef.current) {
  //     const dataUrl = await toPng(posterRef.current);
  //     saveAs(dataUrl, "poster1.png");
  //     // console.log("Image generated!", dataUrl);
  //     const formdata = new FormData();
  //     const file = saveBase64AsFile(dataUrl, "poster1.png")
  //     formdata.append("uri", file);
  //     formdata.append("message", "hello everyone");
  //     formdata.append("published", true);
  //     formdata.append("access_token", "EAAXGwN0ZCQ9cBOZCUDHt10a4JWDk6sx2gvVdXcZCPUkgNJAHm5ybcLFjLLcXR78zJwgOY84evpvp1yvVZAhOZAsZBIeJDaUy6G5b1yS6DO90UWWhxcqENqo6bzN0i7XcAO6ZCSXuZBOCB02fPHudPKNn8zoZBDGFes7pLzBHG5jV8bhD9d5Kgd1JI0uukenGZCJtviGCfVoTeciZBeHZBtpZClqcPwBIZD");
  //     const postRes = await dispatch(postImageonFbPage(formdata))
  //     console.log("PostRes", postRes)
  //   }
  // };


  const handleGenerateImage = async () => {
    if (posterRef.current) {
      // Ensure it's a canvas or can be rendered to one
      const dataUrl = await toPng(posterRef.current); // Generate Base64 image string
      saveAs(dataUrl, "poster1.png");
      console.log("Generated Image URL:", dataUrl);
  
      // Convert Base64 to Blob
      const base64Data = dataUrl.split(";base64,").pop();
      const byteCharacters = atob(base64Data);
      const byteNumbers = Array.from(byteCharacters).map((char) => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });
  
      // Convert Blob to File
      const file = new File([blob], "poster1.png", { type: "image/png" });
  
      // Prepare FormData
      const formdata = new FormData();
      formdata.append("uri", file);
      // formdata.append("message", "hello everyone");
      formdata.append("published", true);
      formdata.append(
        "access_token",
        "EAAXGwN0ZCQ9cBO0TnqpPVWXDZBR2W2LSDFSrBKzhZC6wOVBjl7guSFuNjC8qZBFZCodKbAHE4xLlhZAGoHrOy4LHTxVqnSWiKaVcbtIzgSpVedZBfGFNSJUWBZBsLNZCp3RZC9hqauoIsmkbBFeU3EPquVRE1Nf82KHMxELhQ1H8nZBUqPIXjYCEERELqkCbANg9JAZD"
      );
  
      // Post FormData
      const postRes = await dispatch(postImageonFbPage(formdata));
      console.log("PostRes", postRes);
      if(postRes.post_id){
        toast.success("Image Posted Successfully")
      }else{
          toast.error("Failed to post image")
      }
      }
  };
  
  

  // console.log("data", data)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>FB Post</button>
      
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Poster Modal"
        style={{  content: { width: "630px", margin: "auto" } }}
      >
        <div ref={posterRef} className="poster">
          {/* <h2 style={{ backgroundColor: "red", color: "white", padding: "10px" }}>BREAKING NEWS</h2> */}
          <div className="poster-logo">
            <img
              src="https://expedblobstorage.blob.core.windows.net/permanentimages/42c515f4-9129-4350-9f5a-e031bb5eb39d?se=2139-02-08T04%3A48%3A38Z&sp=r&sv=2023-11-03&sr=b&sig=ZKbEbI4FsUFmZIR%2Bg3DJsL247yxfLF5UlADZd0XNkBs%3D" // Replace with your logo URL
              alt="RxpediChat Logo"
              className="logo"
            />
          </div>
          <div className="poster-breaking-news">
            <img
              src="https://expedblobstorage.blob.core.windows.net/permanentimages/82c0a5cc-e82c-48eb-9c57-4561ab607511?se=2139-02-09T02%3A44%3A29Z&sp=r&sv=2023-11-03&sr=b&sig=ivH4IEtvTCsOIf39Z1MekeN0dT45URaVphvzCQtu1Ro%3D" // Replace with your logo URL
              // src="https://expedblobstorage.blob.core.windows.net/permanentimages/42c515f4-9129-4350-9f5a-e031bb5eb39d?se=2139-02-08T04%3A48%3A38Z&sp=r&sv=2023-11-03&sr=b&sig=ZKbEbI4FsUFmZIR%2Bg3DJsL247yxfLF5UlADZd0XNkBs%3D" // Replace with your logo URL
              alt="breaking News"
              className="poster-breaking-news-logo"
            />
          </div>
          <img
            src= {data.featured_image} // Replace with your image URL
            alt="Poster"
            className="poster-image"
          />
          <div className="poster-content">
            <h3 className="poster-title">{data.summary_dict.title}</h3>
            <p className="poster-summary">{data.summary_dict.summary}</p>
          </div>
        </div>
        
        <button onClick={handleGenerateImage}>Publish</button>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default PosterGenerator;
