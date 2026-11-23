import './RSSForm.scss';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { createRssFeedUrl } from '../../../redux/allApiCall/action';

function RSSForm() {
  const [formData, setFormData] = useState({
    category: '',
    rssUrl: '',
    channelName: '',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await dispatch(createRssFeedUrl(formData));
      console.log('createRssFeedUrlResponse:', res);
      setLoading(false);
      toast(res.msg, { position: "bottom-center", type: "success" });
      setFormData({
        category: '',
        rssUrl: '',
        channelName: '',
      });
    }
    catch (err) {
      console.log("err", err)
      toast(err, { position: "bottom-center", type: "error" });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "15px", marginTop: "10px" }}>Submit RSS Feed URL</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="science">Science</option>
            <option value="social trend">Social Trend</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div>
          <label>RSS URL:</label>
          <input
            type="text"
            name="rssUrl"
            value={formData.rssUrl}
            required
            placeholder='Enter Your RSS URL'
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Channel Name:</label>
          <input
            type="text"
            name="channelName"
            value={formData.channelName}
            required
            placeholder='Enter Your Channel Name'
            onChange={handleChange}
          />
        </div>
        <button type="submit">{loading ? <CircularProgress /> : 'Create RSS'}</button>
      </form>
    </div>
  );
}

export default RSSForm;
