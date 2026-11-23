
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/navbar/Navbar"
import Sidebar from "../../../components/sidebar/Sidebar"
import React, { useEffect, useState } from "react";
import "./GetSummarize.scss";
import { deleteSummarizerData, generate_humanize_content, generate_image_by_models, generate_image_by_pexels, getSummarizerData, publishSummarizerData, regenerateSummarizerData } from "../../../redux/allApiCall/action";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import MutipleSelection from "../../../hooks/MutipleSelection";
import SplitButton from "../../../hooks/SplitButton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UrlMapSections from "../../../hooks/UrlMapSections";
const GetSummarize = () => {
  const { allSummarizerData } = useSelector((state) => state.Allapicall);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSummarizerData());
    // console.log("allSummarizerData:", allSummarizerData);
  }, []);


  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <NewsCard
          data={allSummarizerData}
        />
      </div>
    </div>
  )
}

export default GetSummarize


const NewsCard = ({ data }) => {
  const [selectedSummaries, setSelectedSummaries] = useState({});
  const [selectedArticle, setSelectedArticle] = useState({});
  const [featuredImages, setFeaturedImages] = useState({}); // Store featured image for each card
  const [loadingState, setLoadingState] = useState({}); // Fix: initialize as an object
  const [loadingStateHumanize, setLoadingStateHumanize] = useState({}); // Fix: initialize as an object
  const [loadingStateImage, setLoadingStateImage] = useState({}); // Fix: initialize as an object
  const [loadingStateDelete, setLoadingStateDelete] = useState({}); // Fix: initialize as an object 
  const [loadingStatePublish, setLoadingStatePublish] = useState({}); // Fix: initialize as an object
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  

  const dispatch = useDispatch();

  const handleCheckboxChange = (itemId, summaryIndex) => {
    setSelectedSummaries((prevSelected) => ({
      ...prevSelected,
      [itemId]: {
        [summaryIndex]: true,
      },
    }));
  };

  const imageGenerator = async (option, item) => {
    const itemId = item?._id;
    // console.log("option", item);

    // Set loading state for the specific card
    setLoadingStateImage((prevLoading) => ({
      ...prevLoading,
      [itemId]: true,
    }));

    try {
      if (option === "Generate Image") {
        toast("Please Select Model or Pexels");
        // Reset loading state and return early if no valid option is selected
        setLoadingStateImage((prevLoading) => ({
          ...prevLoading,
          [itemId]: false,
        }));
        return;
      }
      const selected_summary = getSelectedSummary(item); 
      console.log("selected_summary", selected_summary)// Function to handle selected summary logic
      if (!selected_summary) return;
      let img_res;
      if (!selected_summary?.imagePrompt) {
        toast("Image prompt not found. Please try again.");
        setLoadingStateImage((prevLoading) => ({
          ...prevLoading,
          [itemId]: false,
        }));
        return;
      }
      const dict = {
        query: selected_summary?.imagePrompt,
        news_id: item._id,
      };
      // console.log("dictddddd", dict);
      // console.log("option", dict);
      const token = '';

      if (option === 'Pexels') {
        // Generate image using Pexels
        img_res = await dispatch(generate_image_by_pexels(dict, token));
        // console.log(img_res)
      }

      if (option === 'Model') {
        // Generate image using Model
        img_res = await dispatch(generate_image_by_models(dict, token));
        console.log("img_res33", img_res);
      }

      // Display the message returned from the API
      
      if(img_res?.response?.status == "500"){
        toast(img_res?.response?.data?.error)
      }
      toast(img_res?.msg);

      // Fetch updated summarizer data
      await dispatch(getSummarizerData());
    } catch (error) {
      console.error("Error generating image:", error);
      setLoadingStateImage((prevLoading) => ({
        ...prevLoading,
        [itemId]: false,
      }));
      toast.error("Failed to generate image. Please try again.");
    } finally {
      // Reset loading state after image generation process is done
      setLoadingStateImage((prevLoading) => ({
        ...prevLoading,
        [itemId]: false,
      }));
    }
  };



  const onDelete = async (item) => {
    const { _id } = item;

    // Set loading state for the specific card
    setLoadingStateDelete((prevLoading) => ({
      ...prevLoading,
      [_id]: true,
    }));

    try {
      // Dispatch delete action and wait for its completion
      await dispatch(deleteSummarizerData(_id));
      await dispatch(getSummarizerData());

      // Reset loading state after the API response
      setLoadingStateDelete((prevLoading) => ({
        ...prevLoading,
        [_id]: false,
      }));

      console.log("Deleted:", _id);
    } catch (error) {
      console.error("Error deleting data:", error);

      // Reset loading state even if there is an error
      setLoadingStateDelete((prevLoading) => ({
        ...prevLoading,
        [_id]: false,
      }));

      // Optionally show error to the user
      toast.error("Failed to delete the item. Please try again.");
    }
  };



  const onRegenerate = async (item) => {
    // Set loading state for the specific card
    setLoadingState((prevLoading) => ({
      ...prevLoading,
      [itemId]: true,
    }));
    const itemId = item._id;

    // Check if the selected URL exists for this item
    const selected_url = selectedArticle[itemId] || {};

    if (!selected_url?.url) {
      toast("Please select a Reference URL to regenerate");
      setLoadingState((prevLoading) => ({
        ...prevLoading,
        [itemId]: false,
      }));
      return;
    }
    const data = {
      article_url: selected_url?.url,
    };


    try {
      // Dispatch regeneration action and wait for its completion
      await dispatch(regenerateSummarizerData(itemId, data));
      await dispatch(getSummarizerData());

      // Reset loading state after the API response
      setLoadingState((prevLoading) => ({
        ...prevLoading,
        [itemId]: false,
      }));
    } catch (error) {
      console.error("Error regenerating data:", error);

      // Reset loading state even if there is an error
      setLoadingState((prevLoading) => ({
        ...prevLoading,
        [itemId]: false,
      }));

      // Optionally show error to the user
      toast.error("Failed to regenerate summary. Please try again.");
    }
  };



  const onHumanizeData = async (item) => {
    const itemId = item?._id;

    const selected_summary = getSelectedSummary(item); // Function to handle selected summary logic
    if (!selected_summary) return; // Return if no summary is selected

    // Set loading state for the specific card
    setLoadingStateHumanize((prevLoading) => ({
      ...prevLoading,
      [itemId]: true,
    }));

    const data = {
      content: selected_summary.summary,
      title: selected_summary.title,
      news_id: itemId,
      slug: selected_summary.slug,
    };
    const token = ''; // Token for API

    try {
      // Simulate API request or regeneration process
      await dispatch(generate_humanize_content(data, token));
      await dispatch(getSummarizerData());

      // Reset loading state after the API response
      setLoadingStateHumanize((prevLoading) => ({
        ...prevLoading,
        [itemId]: false,
      }));
    } catch (error) {
      console.error("Error humanizing content:", error);
      setLoadingStateHumanize((prevLoading) => ({
        ...prevLoading,
        [itemId]: false,
      }));
      // Optionally show error to the user
      toast.error("Failed to humanize content. Please try again.");
    }
  };

  // Helper function to get selected summary
  const getSelectedSummary = (item) => {
    const itemId = item?._id;
    const selected = selectedSummaries[itemId] || {};
    const selectedIndices = Object.keys(selected)
      .filter((index) => selected[index])
      .map(Number);

    const selected_summary = selectedIndices?.map(
      (index) => item.summary_dict[index]
    );
    if (!selected_summary || selected_summary.length === 0) {
      toast("Please select at least one summary");
      return null;
    }
    return selected_summary[0]; // Return the first selected summary
  };

  const handlePublish = async (item) => {
    const itemId = item?._id;

    // Set loading state for the specific card
    setLoadingStatePublish((prevLoading) => ({
      ...prevLoading,
      [itemId]: true,
    }));

    const selected = selectedSummaries[itemId] || {};
    const selectedIndices = Object.keys(selected)
      .filter((index) => selected[index])
      .map(Number);

    const selected_summary = selectedIndices?.map(
      (index) => item.summary_dict[index]
    );
    if (!author) {
      toast("Please select an Short By to publish");
      setLoadingStatePublish((prevLoading) => ({
        ...prevLoading,
        [itemId]: false,
      }));
      return;
    }
    if (selected_summary?.length > 0) {
      const payload = {
        summary_dict: selected_summary[0],
        status: "draft",
        short_by: author,
        reference_url: item?.refrence_url,
        featured_image: featuredImages[itemId], // Use the specific card's featured image
        favourite: true,
        views: 1,
        likes: 1,
        categories: item?.categories,
        tags: ["news"],
      };

      try {
        // Dispatch publish action and wait for its completion
        await dispatch(publishSummarizerData(payload));

        // Clear selected summaries and URLs
        setSelectedSummaries({});
        setSelectedArticle({});

        // Navigate to final articles page after successful publish
        // navigate("/final-articles");
        toast("News Published Successfull")
      } catch (error) {
        console.error("Error publishing summary:", error);
        toast.error("Failed to publish the item. Please try again.");
      } finally {
        // Reset loading state after publish process is done
        setLoadingStatePublish((prevLoading) => ({
          ...prevLoading,
          [itemId]: false,
        }));
      }
    } else {
      toast("Please select at least one summary to publish")// Trigger notification if no summary is selected

      // Reset loading state if no summary was selected
      setLoadingStatePublish((prevLoading) => ({
        ...prevLoading,
        [itemId]: false,
      }));
    }
  };


  // Set the 0th image as default for each news card
  useEffect(() => {
    const initialImages = data.reduce((acc, item) => {
      acc[item._id] = item?.featured_image[0];
      return acc;
    }, {});
    setFeaturedImages(initialImages);
  }, [data]);

  // Update the featured image for a specific card
  const handleImageClick = (itemId, url) => {
    setFeaturedImages((prevImages) => ({
      ...prevImages,
      [itemId]: url,
    }));
  };


  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  const handleSelectedRefrenceUrl = (url, article_id) => {
    setSelectedArticle((prevSelected) => ({
      ...prevSelected,
      [article_id]: url,
    })
    );
    console.log("selectedArticle", article_id);
  };

  return (
    <div className="news-container">
      {data.map((item) => (
        <div key={item._id} className="news-card">
          <div>
            <div>
              {/* Display the specific featured image for this card */}
              <img
                src={featuredImages[item._id]}
                alt={item.summary_dict[0].title}
                className="news-image"
                onClick={() => copyToClipboard(featuredImages[item._id])}
              />
            </div>
            <div>
              {item?.featured_image?.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index}`}
                  className={`multi-image ${featuredImages[item._id] === url ? "active-image" : ""
                    }`}
                  onClick={() => handleImageClick(item._id, url)} // Set featured image for this specific card
                />
              ))}
            </div>
          </div>

          <div className="news-content">
            <button
              className="action-button publish-button"
              onClick={() => handlePublish(item)}
              disabled={loadingStatePublish[item._id]} // Disable while loading
            >
              {loadingStatePublish[item._id] ? (
                <span className="loader"></span> // Add a loader
              ) : (
                "Publish"
              )}
            </button>
            {/* <ToastContainer /> */}
            {item.summary_dict.map((summary, index) => (
              <div key={index} className="summary-section">
                <h3>{summary.type}</h3>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedSummaries[item._id]?.[index] || false}
                    onChange={() => handleCheckboxChange(item._id, index)}
                  />
                  <span
                    className="news-title"
                  >
                    {summary.title} <ContentCopyIcon sx={{ fontSize: 20 }} onClick={() => copyToClipboard(summary.title)} />
                  </span>
                </label>
                <p
                  className="news-summary"
                >
                  {summary.summary} <span><ContentCopyIcon sx={{ fontSize: 20, color: "gray" }} onClick={() => copyToClipboard(summary.summary)} /></span>
                </p>
              </div>
            ))}
            <div className="news-actions">
              <a
                href={item.refrence_url[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="news-link"
              >
                read more at
              </a>
              <select
                className="author-select"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option value="">Short By</option>
                <option value="Shankar Kumar">Shankar Kumar</option>
                <option value="Vishal Gholve">Vishal Gholve</option>
                <option value="Afreen Aisha">Afreen Aisha</option>
                <option value="Khushwant Kaur">Khushwant Kaur</option>
                <option value="Lakshey Kumar">Lakshey Kumar</option>
              </select>
              <SplitButton imageGenerator={imageGenerator} item={item} loadingStateImage={loadingStateImage} />
              <button
                className="action-button regenerate-button"
                onClick={() => onRegenerate(item)}
                disabled={loadingState[item._id]} // Disable while loading
              >
                {loadingState[item._id] ? (
                  <span className="loader"></span> // Add a loader
                ) : (
                  "Regenerate"
                )}
              </button>

              <button
                className="action-button regenerate-button"
                onClick={() => onHumanizeData(item)}
                disabled={loadingStateHumanize[item._id]} // Disable while loading
              >
                {loadingStateHumanize[item._id] ? (
                  <span className="loader"></span> // Add a loader
                ) : (
                  "Humanize"
                )}
              </button>
              <button
                className="action-button delete-button"
                onClick={() => onDelete(item)}
                disabled={loadingStateDelete[item._id]} // Disable while loading
              >
                {loadingStateDelete[item._id] ? (
                  <span className="loader"></span> // Add a loader
                ) : (
                  "Delete"
                )}
              </button>
            </div>
            <UrlMapSections articles={item?.refrence_url} handleSelectedRefrenceUrl={handleSelectedRefrenceUrl} selectedArticle={selectedArticle} article_id={item?._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

// export default NewsCard;
