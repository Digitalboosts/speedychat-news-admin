import React, { useEffect, useState, useRef } from 'react';
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as types from '../../redux/allApiCall/actionType';
import './reader.css';
import { deleteCategoryData, deleteSummarizeGuids, getCategoriseData, getSummarizeGuids, saveRssXmlData, sendNewsData, sendSummarizerData } from '../../redux/allApiCall/action';

const ReaderApp = ({ rssFeeds, category }) => {
    const [storeAllXmlData, setStoreAllXmlData] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(rssFeeds[0]?.channelName || '');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState({});
    const [loadingStateCategory, setLoadingStateCategory] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allCategories, allSummarizerData, summarizeGuids } = useSelector((state) => state.Allapicall);
    const isInitialLoad = useRef(true);
    // Initialize feed data and categories on component mount
    useEffect(() => {
        const initializeFeedAndCategories = async () => {
            if (rssFeeds?.length > 0) {
                const initialFeed = rssFeeds[0];
                const feedDatas = await dispatch(saveRssXmlData(initialFeed.rssUrl));
                setStoreAllXmlData(feedDatas);
                await dispatch(getCategoriseData(initialFeed?.channelName));
                await dispatch(getSummarizeGuids(initialFeed?.channelName));
            }
        };
        initializeFeedAndCategories();
    }, [rssFeeds, dispatch]);

    // Watch for changes in allCategories and storeAllXmlData to update categories
    useEffect(() => {
        if (storeAllXmlData.length > 0 && allCategories.length > 0) {
            const updatedData = updateFeedData(storeAllXmlData, allCategories);
            if (JSON.stringify(updatedData) !== JSON.stringify(storeAllXmlData)) {
                setStoreAllXmlData(updatedData);
            }
        }
    }, [allCategories, storeAllXmlData]);

    useEffect(() => {
     const deleteSummarizedGuids = async () => {
        if (storeAllXmlData?.length > 0 && summarizeGuids?.length > 0) {
            const storedGuids = storeAllXmlData.map(item => item.guid);
            const newSummarizeGuids = summarizeGuids.filter(guid => !storedGuids.includes(guid));
            if (newSummarizeGuids.length > 0) {
                 await  dispatch(deleteSummarizeGuids(selectedFeed, newSummarizeGuids))
                 await dispatch(getSummarizeGuids(selectedFeed));
            }
            else {
                console.log("No new summarize guids found");
            }
        }
        };
        deleteSummarizedGuids();
    }, [summarizeGuids, storeAllXmlData]);
    const handleCategorizationAndSend = async () => {
        setLoadingStateCategory(true);
        const uncategorizedItems = storeAllXmlData.filter(item => !item.category);
        if (uncategorizedItems.length > 0) {
            
            await dispatch(sendNewsData(uncategorizedItems, selectedFeed));
            await dispatch(getCategoriseData(selectedFeed));
        }
        if (storeAllXmlData?.length > 0 && allCategories?.length > 0) {
            const storedGuids = storeAllXmlData.map(item => item.guid);
            const newGuids = allCategories.filter(item => !storedGuids.includes(item.guid)).map(item => item.guid);
            if (newGuids.length > 0) {
                 await  dispatch(deleteCategoryData(selectedFeed, newGuids))
                 await dispatch(getCategoriseData(selectedFeed));
            }
            else {
                console.log("No new guids found");
            }
        }
        setLoadingStateCategory(false);
    };
    const updateFeedData = (originalFeedData, latestFeedData) => {
        return originalFeedData.map((originalItem) => {
          const matchingItem = latestFeedData.find(latestItem => originalItem.guid === latestItem.guid);
    
          if (matchingItem && matchingItem.category) {
            return { ...originalItem, category: matchingItem.category };
          } else {
            return originalItem; // Return the original item without modifying it
          }
        });
      };
    const handleChannelChange = async (event) => {
        const selectedChannelId = parseInt(event.target.value);
        const selectedChannel = rssFeeds.find(channel => channel.id === selectedChannelId);
        if (selectedChannel) {
            const feedDatas = await dispatch(saveRssXmlData(selectedChannel.rssUrl));
            const channelName = selectedChannel?.channelName;  // Use the new value directly
            setSelectedFeed(channelName);
            setStoreAllXmlData(feedDatas);
            await dispatch(getCategoriseData(channelName));
            await dispatch(getSummarizeGuids(channelName));

        }
    };

    const handleSummarizerButton = async (item) => {
        setLoading((prev) => ({ ...prev, [item.guid]: true }));
        const payload = {
            article_url: item?.link,
            featured_image: item?.imageUrl,
            title: item?.title,
            short_by: "shankar kumar",
            categories: category ,
            guid: item?.guid,
            channel: selectedFeed,
        };
        const isAlreadySummarized = allSummarizerData?.some(data => data?.featured_image[0] === item?.imageUrl);
        if (isAlreadySummarized) {
            navigate('/articles');
        } else {
            await dispatch(sendSummarizerData(payload));
            await dispatch(getSummarizeGuids(selectedFeed));
            toast.success("Summarization completed successfully!");
        }
        setLoading((prev) => ({ ...prev, [item.guid]: false }));
    };

    return (
        <div>
         <select onChange={handleChannelChange} className="channel-select">
                <option value={selectedFeed || ""} disabled selected>{selectedFeed ? selectedFeed : "Select a channel"}</option>
                {rssFeeds?.map(channel => (
                    <option key={channel.id} value={channel.id}>
                        {channel.channelName}
                    </option>
                ))}
            </select>

            <div>
                <h1>{category} Feed</h1>
                <div className='button_sectionmain'>
                    <div>
                        {['All', 'Best News', 'Average News', 'Poor News'].map(cat => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div>
                        <button
                            onClick={handleCategorizationAndSend}
                            disabled={loadingStateCategory}
                        >
                            {loadingStateCategory ? <span className="loader"></span> : "Category"}
                        </button>
                    </div>
                </div>
                <table className="feed-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Snippet</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeAllXmlData
                            .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
                            .map(item => (
                                <tr key={item.guid}>
                                    <td>{item.title}</td>
                                    <td>{item.contentSnippet}</td>
                                    <td>
                                        {item.imageUrl && (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                style={{ width: '100px', height: '80px' }}
                                            />
                                        )}
                                    </td>
                                    <td>{item.category || 'Loading...'}</td>
                                    <td>
                                        <Button
                                            onClick={() => handleSummarizerButton(item)}
                                            disabled={
                                                loading[item.guid] ||
                                                summarizeGuids?.some(data => data=== item?.guid)
                                            }
                                            variant="primary"
                                            sx={{ backgroundColor: '#42ccb3', color: 'white', fontSize: '12px' }}
                                        >
                                            {loading[item.guid] ? (
                                                <CircularProgress size={24} />
                                            ) : (
                                                "Summarize Now"
                                            )}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReaderApp;
