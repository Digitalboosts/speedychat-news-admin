import React, { useState, useEffect } from "react";
import style from "./Add.module.css";
import Editor from "../../../components/Editor/Editor.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { DNA } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { playGroundSaveData, uploadImage } from "../../../redux/allApiCall/action.js";

export const Add = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [featuredImage, setfeaturedImage] = useState(null);
  const [slug, setSlug] = useState("");
  const [keywords, setKeywords] = useState("");
  const [desc, setDesc] = useState("");
  const [metadata, setMetaData] = useState("");
  const [author, setAuthor] = useState("");
  const [website, setWebsite] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [reference_url, setReferenceUrl] = useState("");
  const [categories, setCategories] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();

  const extractTextFromHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const BASE_URL = "http://20.163.239.30:9033/expedichat/v0/";
  // const BASE_URL = "http://127.0.0.1:8000/expedichat/v0/";
  // const BASE_URL = 'app/expedichat/v0/'

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

  // const handleSaveDraft = () => {
  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("content", content);
  //   formData.append("featuredImage", featuredImage);
  //   formData.append("slug", slug);
  //   formData.append(
  //     "keywords",
  //     keywords.split(",").map((keyword) => keyword.trim(" "))
  //   );
  //   formData.append("short_desc", desc);
  //   formData.append("metadata", metadata);
  //   formData.append("author", author);
  //   formData.append("website", website);
  //   formData.append("status", "draft");

  //   setLoading(true);

  //   axios
  //     .post(`${BASE_URL}save/blog/data/`, formData)
  //     .then((response) => {
  //       // Handle success
  //       setLoading(false);

  //       toast.success("Draft saved successfully");
  //       // console.log("Draft saved successfully:", response.data);
  //     })
  //     .catch((error) => {
  //       setLoading(false);

  //       // Handle error
  //       toast.error("Error saving draft");
  //       console.error("Error saving draft:", error);
  //     });
  // };

  console.log("content", content);

  const handlePublish = async () => {
    try {
      if (featuredImage) {
        const formData2 = new FormData();
        formData2.append("files", featuredImage);
        const token = "";
        setLoading(true);
        var image_url = await dispatch(uploadImage(formData2, token));
      }
      else {
        var image_url = selectedImage
      }


      const formData = {
        summary_dict: {
          title: title,
          summary: extractTextFromHTML(content),
          slug: slug,
        },
        status: "draft",
        short_by: author,
        reference_url: reference_url.split(",").map((url) => url.trim(" ")),
        featured_image: image_url,
        favourite: false,
        views: 1,
        likes: 1,
        categories: categories,
        tags: keywords.split(",").map((keyword) => keyword.trim(" ")),
      };
      console.log("formData", formData);
      await dispatch(playGroundSaveData(formData));
      toast.success("Successfully published", {
        position: "bottom-center",
        type: "success",
      });
      setLoading(false);
    }
    catch (error) {
      setLoading(false);

      // Handle error
      toast.error("Error publishing post", {
        position: "bottom-center",
        type: "error",
      });
      console.error("Error publishing post:", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <Editor
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
      </div>
      <div className={style.right}>
        {/* <div className={style.actions}>
          <button onClick={handleSaveDraft} className={style.saveDraftButton}>
            Save draft
          </button>
          <button onClick={handlePublish} className={style.publishButton}>
          Save draft
          </button>
        </div> */}
        <button onClick={()=>handlePublish()} className={style.publishButton}>
          Save draft
        </button>
        <div className="description">
          <textarea
            style={{ borderRadius: 10, padding: "10px", width: "100%" }}
            name=""
            id=""
            rows={7}
            placeholder="Enter Refrence URL here"
            // onChange={(e) => setDesc(e.target.value)}
            onChange={(e) => setReferenceUrl(e.target.value)}
          ></textarea>
        </div>
        <div className="description">
          <textarea
            style={{ borderRadius: 10, padding: "10px", width: "100%" }}
            name=""
            id=""
            rows={4}
            placeholder="Enter Image Blob Url here"
            onChange={(e) => setSelectedImage(e.target.value)}
          ></textarea>
        </div>
        <div className={style.featuredImage}>
          <h4>Featured Image</h4>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={style.chooseButton}
          />

          {/* Image preview container */}
          <div className={style.imageContainer}>
            {selectedImage && (
              <img
                className={style.imageBox}
                src={selectedImage}
                alt="Image Preview"
              />
            )}
          </div>
        </div>
        <div className={style.options}>
          <h4>Categories</h4>
          <select
            name="categories"
            value={website}
            onChange={(e) => setCategories(e.target.value)}
          >
            <option value="">Select Categories</option>
            <option value="science">Science</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
          </select>
          <select
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="">Select Author</option>
            <option value="Shankar Kumar">Shankar Kumar</option>
            <option value="Vishal Gholve">Vishal Gholve</option>
            <option value="Afreen Aisha">Afreen Aisha</option>
            <option value="Khushwant Kaur">Khushwant Kaur</option>
            <option value="Lakshey Kumar">Lakshey Kumar</option>
          </select>
          <input
            className={style.slugBox}
            type="text"
            value={slug}
            placeholder="Enter slug here"
            onChange={(e) => setSlug(e.target.value)}
          />
          <textarea
            className={style.keywordBox}
            type="text"
            placeholder="Keyword 1, Keyword 2"
            value={keywords}
            onChange={(e) => {
              const keywords = e.target.value;

              setKeywords(keywords);
            }}
          />
        </div>
      </div>
      <div className={style.loader}>
        <DNA
          visible={loading}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </div>
  );
};
