
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteRssFeedUrl, editRssFeedUrl, getRssFeedUrl } from "../../../redux/allApiCall/action";
import { toast } from "react-toastify";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./AllRSS.scss";

const GetAllRSS = () => {
  const dispatch = useDispatch();
  const { allRssFeedsUrl } = useSelector((state) => state.Allapicall);
  const [loading, setLoading] = useState(null); // to track which delete button is loading
  const [editData, setEditData] = useState(null); // to store the current RSS feed being edited
  const [open, setOpen] = useState(false);

  const handleEdit = (rss) => {
    setEditData(rss); // set the data of the RSS feed to edit
    setOpen(true); // open the modal
  };

  const handleClose = () => {
    setOpen(false); // close the modal
    setEditData(null); // clear the edit data
  };

  const handleSave = async () => {
    if (!editData) return; // return if there is no data to save
    const { id, category, channelName, rssUrl } = editData;
    const dataToSave = { category, channelName, rssUrl };
    try {
      const response = await dispatch(editRssFeedUrl(id, dataToSave));

      if (response) {
        
        toast.success("RSS feed updated successfully!");

        handleClose();
      }
    } catch (error) {
      // Handle any errors that occur during the save operation
      console.error("Error saving RSS feed:", error);
      toast.error("Failed to update RSS feed. Please try again.");
    }
  };



  const handleDelete = async (id) => {
    setLoading(id); // set loading state to the id of the item being deleted
    const token = ""; // Add your token here
    try {
      await dispatch(deleteRssFeedUrl(id, token));
      await dispatch(getRssFeedUrl());
      toast("Deleted Successfully", {
        position: "bottom-center",
        type: "success",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      console.error("Failed to delete RSS feed:", error);
    } finally {
      setLoading(null); // reset loading state after the process completes
    }
  };
  console.log("editData", editData)
  useEffect(() => {
    dispatch(getRssFeedUrl());
  }, [dispatch]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <h1>Getting All RSS Data</h1>
        <table className="rssTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Channel Name</th>
              <th>RSS URL</th>
              <th>Created At</th>
              <th>Edit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRssFeedsUrl && allRssFeedsUrl.length > 0 ? (
              allRssFeedsUrl.map((rss) => (
                <tr key={rss.id}>
                  <td>{rss.id}</td>
                  <td>{rss.category}</td>
                  <td>{rss.channelName}</td>
                  <td>{rss.rssUrl}</td>
                  <td>{new Date(rss.created_at).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleEdit(rss)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(rss.id)} disabled={loading === rss.id}>
                      {loading === rss.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No RSS feeds available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal for editing RSS feed */}
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Edit RSS Feed</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Category"
            variant="outlined"
            fullWidth
            value={editData?.category || ""}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Channel Name"
            variant="outlined"
            fullWidth
            value={editData?.channelName || ""}
            onChange={(e) => setEditData({ ...editData, channelName: e.target.value })}
          />
          <TextField
            margin="normal"
            label="RSS URL"
            variant="outlined"
            fullWidth
            value={editData?.rssUrl || ""}
            onChange={(e) => setEditData({ ...editData, rssUrl: e.target.value })}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default GetAllRSS;
