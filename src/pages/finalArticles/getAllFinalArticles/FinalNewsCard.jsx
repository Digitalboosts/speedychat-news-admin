import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./FinalNewsCard.scss";
import {
  deleteFinalNewsData,
  editFinalNewsData,
  fetchFinalNewsAllData,
  fetchFinalNewsData,
  sendNewsDataToProductionDB,
  sendNotificationApp,
} from "../../../redux/allApiCall/action";
import { toast } from "react-toastify";
import Scheduler from "../../../components/schedule/Scheduler";
import { NewsCard } from "../../../components/screenshort/NewsCard.jsx"
import PosterGenerator from "../../../components/PosterGenerator/PosterGenerator.jsx";
// import EditNewsItemDialog from "../UpdatedataBox/EditNewsItemDialog";

const FinalNewsCard = ({ data }) => {
  const dispatch = useDispatch();
  const [newsData, setNewsData] = useState(data);
  const [editItem, setEditItem] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  // Pagination state
  const { allFinalNewsDashboardData } = useSelector((state) => state.Allapicall);

  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(allFinalNewsDashboardData?.length / itemsPerPage);

  // Slice the data for current page
  const paginatedData = newsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleNextPage = async () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    const total_data = currentPage + 1
    const total_news = allFinalNewsDashboardData?.length
    const total_length = Math.ceil(total_news / 24)
    if (total_data <= total_length - 1) {
      const newsDatas = await dispatch(fetchFinalNewsData(total_length * 27))
      setNewsData(newsDatas);
    };
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);

  };



  const handleStatusChange = async (id) => {
    try {
      const updatedData = newsData.map((item) =>
        item._id === id
          ? {
            ...item,
            status:
              item.status === "draft"
                ? "published"
                : item.status === "published"
                  ? "approved"
                  : "draft",
          }
          : item
      );

      setNewsData(updatedData);

      const updatedStatus = updatedData.find((item) => item._id === id).status;

      const data = { status: updatedStatus };
      const res = await dispatch(editFinalNewsData(id, data));

      if (res.status === "202") {
        toast(res.data.msg, {
          position: "bottom-center",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };



  const handleEdit = (item) => {
    setEditItem({ ...item });
    console.log(item) // Clone the item to prevent direct state mutation
  };

  const handleDelete = async (id) => {
    try {
      const updatedData = newsData.filter((item) => item._id !== id);
      setNewsData(updatedData);
      const token = "";
      data = await dispatch(deleteFinalNewsData(id, token));
      if (data.status === "202") {
        toast.success(data.data.msg, {
          position: "bottom-center",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleSave = async () => {
    const updatedData = newsData.map((item) =>
      item._id === editItem._id ? editItem : item
    );
    // console.log("updatedData", updatedData);
    setNewsData(updatedData);
    setEditItem(null);
    // console.log("editItem:", editItem);
    const { _id, ...rest } = editItem;
    // console.log("updatedData", rest);
    // console.log("updatedDataId", _id);
    const res = await dispatch(editFinalNewsData(_id, rest));
    // console.log("updatedres:", res);
    if (res.status == "202") {
      toast(res.data.msg, {
        position: "bottom-center",
        type: "success",
      });
    }
  };

  const handleCancel = () => {
    // setSelectedItem(null);
    setEditItem(null);
  };

  // console.log("newsData:", newsData);
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditItem((prev) => ({
  //     ...prev,
  //     [name.includes("summary_dict") ? "summary_dict" : name]: {
  //       ...(name.includes("summary_dict") ? prev.summary_dict : prev),
  //       [name.split(".").pop()]: value,
  //     },
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditItem((prev) => {
      // Determine if the change is within the 'summary_dict'
      if (name.includes("summary_dict")) {
        const key = name.split(".").pop(); // Get the key for summary_dict

        // Only update the specific key within summary_dict
        return {
          ...prev,
          summary_dict: {
            ...prev.summary_dict,
            [key]: value,
          },
        };
      } else {
        // Update the other key directly
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const getDomain = (url) => {
    try {
      return new URL(url).hostname;
    } catch (error) {
      console.error("Invalid URL:", error);
      return "Invalid URL";
    }
  };

  function countWords(paragraph) {
    // Trim any leading or trailing whitespace and split the paragraph into words
    const words = paragraph.trim().split(/\s+/);

    // Return the total number of words
    return words.length;
  }
  const [publishedArticles, setPublishedArticles] = useState([]);

  // const sendNotification = async (item) => {
  //   try {
  //     // console.log("item", item)
  //     if (item.status === "draft") {
  //       toast.error("Please change the status to published", {
  //         position: "bottom-center",
  //         type: "error",
  //       });
  //       return;
  //     }
  //     const payload = {
  //       notification: {
  //         "title": item?.summary_dict.title,
  //         "body": item?.summary_dict.summary,
  //         "image": item?.featured_image
  //       },

  //       data: {
  //         "route": "SingleArticle",
  //         "articleId": item._id
  //       }
  //     }
  //      console.log("payloadsendn", payload)
  //     // const res = await dispatch(sendNewsDataToProductionDB(payload));
  //     if ("202" == "202") {
  //       toast("Notification successfully send", {
  //         position: "bottom-center",
  //         type: "success",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Failed to update:", error);
  //   }
  // };

  // Function to check if the date is today
  // const isToday = (dateString) => {
  //   const today = new Date().toISOString().split("T")[0];
  //   return dateString === today;
  // };

  // // Function to auto-publish articles created today
  // const handleAutoPublish = async (id) => {
  //   try {
  //     const updatedData = newsData.map((item) =>
  //       item._id === id ? { ...item, status: "published" } : item
  //     );
  //     setNewsData(updatedData);

  //     const data = { status: "published" };
  //     const res = await dispatch(editFinalNewsData(id, data));
  //     console.log("Dispatch result:", res.status);
  //     if (res.status == "202") {
  //       toast(res.data.msg, {
  //         position: "bottom-center",
  //         type: "success",
  //       });

  //       // After publishing, send notification after 20 seconds
  //       setTimeout(() => {
  //         const item = newsData.find((article) => article._id === id);
  //         if (item) {
  //           console.log("Sending notification for item:", item);
  //           sendNotification(item);
  //         }
  //       }, 5000); // 20 seconds delay
  //     }
  //   } catch (error) {
  //     console.error("Auto-publish failed:", error);
  //   }
  // };

  // Function to send notification
  // const sendNotification = async (item) => {
  //   console.log("Sending Notification for item:", item);
  //   try {
  //     const payload = {
  //       notification_dict: {
  //         notification: {
  //           title: item?.summary_dict.title,
  //           body: item?.summary_dict.summary,
  //           image: item?.featured_image,
  //         },
  //         data: {
  //           route: "SingleArticle",
  //           articleId: item._id,
  //         },
  //       },
  //       fcm_token: "fv9ucqY5S9Wav2xcpDTtAq:APA91bGSrkEHjsUfqUhTlXbtd40WrY5kI4OwwWHvuu_D0cH-8fbdaO4Ok7t1owXk_LIkNnC0S5PZi-26flGkedFV6F_-2b-v5bDidsSOVDqMk_Ecdkn1GK_VE4QYIALEIwcqU6bftFJY"
  //     };

  //     // const res = await dispatch(sendNotificationApp(payload));
  //     if ("200" == "202") {
  //       toast.success("Notification successfully sent", {
  //         position: "bottom-center",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Failed to send notification:", error);
  //   }
  // };

  // // Function to check drafts and auto-publish
  // const checkDraftsAndPublish = async () => {
  //   console.log("Checking for drafts to auto-publish every hour...");
  //   newsData.forEach((item) => {
  //     if (isToday(item.created_at.substring(0, 10)) && item.status === "draft") {
  //       handleAutoPublish(item._id);
  //       setPublishedArticles((prev) => [...prev, item._id]);
  //     }
  //   });
  // };


  // useEffect(() => {
  //   // checkDraftsAndPublish();
  //   const intervalId = setInterval(() => {
  //     console.log("Checking for drafts to auto-publish every hour...");
  //     checkDraftsAndPublish();
  //   }, 60000); 

  //   return () => clearInterval(intervalId);
  // }, [newsData,publishedArticles]);

  const handleScheduleComplete = (taskId) => {
    console.log(`Task ${taskId} completed!`);
  };

  const cardData = {
    // imageUrl: "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
    imageUrl: "https://expedblobstorage.blob.core.windows.net/permanentimages/5ed07da0-575f-4603-8053-6519aef37326?se=2139-02-06T23%3A39%3A23Z&sp=r&sv=2024-11-04&sr=b&sig=KSEEs6Js91qfUHl6zy4dyV2JaaTzlNm8Z7g23FxwcnE%3D",
    title: "Breaking News: Elections",
    content: "Supreme Court advises respectful behavior in the Bihar assembly",
    timestamp: "3 hours ago",
  };



  return (
    <div>
      {/* <button onClick={sendNotification}>auto publish</button> */}
      <div style={styles.container}>
        {/* Pagination Controls */}
        <div style={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            className="pagination-button"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
      <div style={styles.container}>

        {paginatedData?.map((item) => (
          <div key={item._id} style={styles.card}>
            <img
              src={item.featured_image}
              alt={item.summary_dict.title}
              style={styles.image}
            />
            <div style={styles.content}>
              <div style={styles.tags}>
                {item.tags.map((tag, index) => (
                  <span key={index} style={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={styles.categories}>{item.categories}</div>
                <span
                  style={{
                    ...styles.status,
                    backgroundColor:
                      item.status === "draft" ? "yellow" : "rgb(153, 222, 153)",
                    color: item.status === "draft" ? "black" : "white",
                    fontSize: "14px",
                  }}
                >
                  {item.status}
                </span>
                <div>{item.created_at.substring(0, 10)}</div>
              </div>
              <h2 style={styles.title}>{item.summary_dict.title}</h2>
              <p style={styles.summary}>{item.summary_dict.summary}</p>
              <div style={styles.footer}>
                <span style={styles.status}>
                  Total Words - {countWords(item.summary_dict.summary)}
                </span>
                <span style={styles.shortBy}>By: {item.short_by}</span>
                <span style={styles.views}>Views: {item.views}</span>
                <span style={styles.likes}>Likes: {item.likes}</span>
              </div>
              {/* {console.log(item.reference_url)} */}
              <div style={styles.links}>
                <select
                  onChange={(e) => {
                    const url = e.target.value;
                    if (url) window.open(url, "_blank", "noopener noreferrer");
                  }}
                  style={styles.select}
                >
                  <option value="">Select Reference URL</option>
                  {item.reference_url.map((url, index) => (
                    <option key={index} value={url.url}>
                      {/* {getDomain(url.url)} */}
                      {url.domain}
                    </option>
                  ))}
                </select>
              </div>
              <button className="status_button" onClick={() => handleStatusChange(item._id)}>
                Status
              </button>
              {/* <div style={{ padding: "16px" }}>
                <NewsCard data={cardData} />
              </div> */}
              <PosterGenerator data={item}/>
              <div><Scheduler taskId={item._id} onScheduleComplete={handleScheduleComplete} content={item} /></div>
              <button className="edit_button" onClick={() => handleEdit(item)}>Edit</button>
              <button className="delete_button" onClick={() => handleDelete(item._id)}>Delete</button>
              {/* <button className="live_button" onClick={() => setPreviewItem(item)}>Notification</button> */}
              
            </div>
          </div>
        ))}


        {editItem && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h2>Edit News Item</h2>
              <label>
                Title:
                <textarea
                  name="summary_dict.title"
                  value={editItem.summary_dict.title}
                  onChange={handleChange}
                  rows={2} // You can adjust the number of rows as needed
                  style={{ width: "100%" }} // Ensures the textarea spans the full width
                />
              </label>
              <label>
                slug:
                <input
                  type="text"
                  name="summary_dict.slug"
                  value={editItem.summary_dict.slug}
                  onChange={handleChange}
                />
              </label>
              <label>
                Summary:
                <textarea
                  name="summary_dict.summary"
                  value={editItem.summary_dict.summary}
                  onChange={handleChange}
                  rows={4} // You can adjust the number of rows as needed
                  style={{ width: "100%" }} // Ensures the textarea spans the full width
                />
              </label>
              {/* <label>
              Status:
              <input
                type="text"
                name="status"
                value={editItem.status}
                onChange={handleChange}
              />
            </label> */}
              <label>
                Short By:
                <input
                  type="text"
                  name="short_by"
                  value={editItem.short_by}
                  onChange={handleChange}
                />
              </label>
              <label>
                Categories:
                <input
                  type="text"
                  name="categories"
                  value={editItem.categories}
                  onChange={handleChange}
                />
              </label>
              <label>
                Tags:
                <input
                  type="text"
                  name="tags"
                  value={editItem.tags.join(", ")}
                  onChange={(e) =>
                    setEditItem((prev) => ({
                      ...prev,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    }))
                  }
                />
              </label>
              {/* <label>
              Reference URLs:
              <textarea
                name="reference_url"
                value={editItem.reference_url.join("\n")}
                onChange={(e) =>
                  setEditItem((prev) => ({
                    ...prev,
                    reference_url: e.target.value
                      .split("\n")
                      .map((url) => url.trim()),
                  }))
                }
              />
            </label> */}
              <button className="save_button" onClick={handleSave}>Save</button>
              <button className="cancel_button" onClick={() => setEditItem(null)}>Cancel</button>
            </div>
          </div>
        )}
        {/* {previewItem && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h2>Notification Preview</h2>
              <img
                src={previewItem.featured_image}
                alt={previewItem.summary_dict.title}
                style={{ width: "40%", height: "200px", objectFit: "cover", margin: "auto" }}
              />
              <br />
              <p><strong>Notification Title:</strong> {previewItem.summary_dict.title}</p>
              <p><strong>Notification Body:</strong> {previewItem.summary_dict.summary}</p>

              <p><strong>Extra Data:</strong></p>
              <pre>{JSON.stringify({ route: "SingleArticle", articleId: previewItem._id }, null, 2)}</pre>
              <div style={{ marginTop: "10px" }}>
                <button
                  className="send_button"
                  onClick={() => {
                    sendNotification(previewItem); // Send the notification
                    setPreviewItem(null); // Close modal
                  }}
                >
                  Send Notification
                </button>
                <button
                  className="cancel_button"
                  onClick={() => setPreviewItem(null)} // Close modal without sending
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )} */}
        {/* <EditNewsItemDialog
        editItem={editItem}
        onSave={handleSave}
        onCancel={handleCancel}
      /> */}
      </div>

    </div>
  );
};

const styles = {
  container: {
    // display: "flex",
    // flexWrap: "wrap",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gridGap: "20px",
    justifyContent: "left",
    padding: "20px",
    marginLeft: "21px",
  },
  card: {
    width: "385px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    backgroundColor: "#fff",
    transition: "transform 0.2s ease-in-out",
    // cursor: "pointer",
    marginBottom: "21px",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  summary: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    color: "#888",
  },
  status: {
    // backgroundColor: "#4CAF50",
    // color: "white",
    padding: "2px 5px",
    borderRadius: "5px",
  },
  categories: {
    backgroundColor: "#5ac4b1",
    color: "white",
    padding: "1px 5px",
    borderRadius: "5px",
  },
  tags: {
    marginTop: "-20px",
    marginBottom: "10px",
  },
  tag: {
    backgroundColor: "#eee",
    borderRadius: "5px",
    padding: "2px 5px",
    marginRight: "5px",
    fontSize: "12px",
  },
  links: {
    marginTop: "10px",
  },
  link: {
    display: "block",
    color: "#007bff",
    textDecoration: "none",
    marginBottom: "5px",
  },
  select: {
    width: "100%",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    marginBottom: "10px",
  },
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border: "2px solid red"
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "600px",
    height: "auto",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    // border: "2px solid green"
  },
};

export default FinalNewsCard;
