// -------------------------------------------------------------------------------------------------------------------------------------
// Author: Sourav Kumar
// Date: 11-12-2023
// -------------------------------------------------------------------------------------------------------------------------------------

import axios from 'axios';

import * as types from './actionType';
// const API_KEY = import.meta.env.VITE_API_BASE_URL;

const VITE_API_BASE_URL = 'http://20.163.239.30:9033/expedichat/v0/'
// const VITE_API_BASE_URL_NEWSMEDIA = "http://127.0.0.1:8000/expedichat/v0/"
// const VITE_API_BASE_URL_20wala = 'http://20.163.239.30:5279/expedichat/v0/'
const VITE_API_BASE_URL_NEWSMEDIA = 'http://20.163.239.30:5279/expedichat/v0/'
// const VITE_API_BASE_URL = 'app/expedichat/v0/'

export const createRssFeedUrl = (payload) => (dispatch) => {
  dispatch({ type: types.CREATE_RSS_FEED_URL_REQUEST });
  console.log("payload", payload);
  return axios
    .post(`${VITE_API_BASE_URL_NEWSMEDIA}rssurl/crud/`,payload)
    .then((res) => {
      // console.log('createRssFeedUrlResponse:', res.data);
      dispatch({ type: types.CREATE_RSS_FEED_URL_SUCCESS, payload: res.data });
      return res.data;
    })
    .catch((err) => {
      // console.log('createRssFeedUrlError:', err);
      dispatch({ type: types.CREATE_RSS_FEED_URL_FAILURE });
      return err;
    });
}

export const getRssFeedUrl = (token) => (dispatch) => {
  dispatch({ type: types.GET_ALL_RSS_FEED_URL_REQUEST });
  return axios
    .get(`${VITE_API_BASE_URL_NEWSMEDIA}rssurl/crud/`, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    })
    .then((res) => {
      // console.log('getRssFeedUrlResponse:', res.data.data);
      dispatch({ type: types.GET_ALL_RSS_FEED_URL_SUCCESS, payload: res.data.data });
      return res.data.data;
    })
    .catch((err) => {
      // console.log('getRssFeedUrlError:', err);
      dispatch({ type: types.GET_ALL_RSS_FEED_URL_FAILURE });
      return err;
    });
}

export const editRssFeedUrl = (id, data, token) => (dispatch) => {
  dispatch({ type: types.EDIT_ALL_RSS_FEED_URL_REQUEST });
  return axios
    .put(`${VITE_API_BASE_URL_NEWSMEDIA}rssurl/crud/?rss_id=${id}`, data, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    })
    .then((res) => {
      // console.log('editRssFeedUrlResponse:', res);
      dispatch({ type: types.EDIT_ALL_RSS_FEED_URL_SUCCESS });
      dispatch(getRssFeedUrl(token));
      return res;
    })
    .catch((err) => {
      // console.log('editRssFeedUrlError:', err);
      dispatch({ type: types.EDIT_ALL_RSS_FEED_URL_FAILURE });
      return
    });
  }


export const deleteRssFeedUrl = (id, token) => (dispatch) => {

  // console.log("id:", id);
  dispatch({ type: types.DELETE_RSS_FEED_URL_REQUEST });
  return axios
    .delete(`${VITE_API_BASE_URL_NEWSMEDIA}rssurl/crud/?rss_id=${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    })
    .then((res) => {
      // console.log('deleteRssFeedUrlResponse:', res);
      dispatch({ type: types.DELETE_RSS_FEED_URL_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('deleteRssFeedUrlError:', err);
      dispatch({ type: types.DELETE_RSS_FEED_URL_FAILURE });
      return err;
    });
}

export const getCategoriseData = (channel_name, token) => (dispatch) => {
  // console.log("channel_name:", channel_name);
  dispatch({ type: types.GET_CATEGORIES_REQUEST });
  return axios
    .get(`${VITE_API_BASE_URL_NEWSMEDIA}verify/news/?channelName=${channel_name}`,
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    )
    .then((res) => {
      dispatch({ type: types.GET_CATEGORIES_SUCCESS, payload: res.data?.data});
      // console.log('getCategoriseDataResponse:', res);
      return res.data?.data;
    }).catch((err) => {
      console.log('getCategoriseDataError:', err);
      dispatch({ type: types.GET_CATEGORIES_FAILURE });
      return err;
    });
}



export const sendNewsData = (data, channel_name, token) => (dispatch) => {
  // console.log("sendNewsData:", data);
  dispatch({ type: types.SEND_NEWSDATA_REQUEST });
  // console.log("sendNewsData SEND_NEWSDATA_REQUEST:", data);
  return axios
    .post(`${VITE_API_BASE_URL_NEWSMEDIA}verify/news/`, { data: JSON.stringify(data), channelName :channel_name }, {
    // .post(`http://127.0.0.1:8000/expedichat/v0/verify/news/`, { data: JSON.stringify(data), channelName : channel_name }, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    })
    .then((res) => {
      console.log('sendNewsDataResponse:', res.data);
      dispatch({ type: types.SEND_NEWSDATA_SUCCESS });
      dispatch(getCategoriseData(channel_name))
      return res.data;
    })
    .catch((err) => {
      console.log('sendNewsDataError:', err);
      dispatch({ type: types.SEND_NEWSDATA_FAILURE });
      return err;
    });
}

export const deleteCategoryData= (channel_name, guids, token) => (dispatch) => {
  console.log("channel_name:", channel_name, "id:", guids);
  dispatch({ type: types.DELETE_CATEGORY_REQUEST });
  return axios
    .delete(`${VITE_API_BASE_URL_NEWSMEDIA}verify/news/?channelName=${channel_name}&guid=${JSON.stringify(guids)}`, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    })
    .then((res) => {
      dispatch({ type: types.DELETE_CATEGORY_SUCCESS });
      return res;
    })
    .catch((err) => {
      console.log('deleteCategoryDataError:', err);
      dispatch({ type: types.DELETE_CATEGORY_FAILURE });
      return
    });
  }





export const saveRssXmlData = (url) => async (dispatch) => {
  // console.log("file:",file)
  console.log("category inside useEffect::",url)
  dispatch({ type: types.SAVE_RSS_XLML_DATA_REQUEST });
  try {
    const response = await fetch(url);
    const text = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');

    const items = xmlDoc.querySelectorAll('item');
    const feedData = Array.from(items).map(item => {
      const description = item.querySelector('description')?.textContent || '';
      const imgSrcMatch = description.match(/<img[^>]+src="([^">]+)"/);
      const imageUrl = imgSrcMatch ? imgSrcMatch[1] : item.querySelector('media\\:content')?.getAttribute('url');

      return {
        title: item.querySelector('title')?.textContent,
        link: item.querySelector('link')?.textContent,
        contentSnippet: description.replace(/<[^>]+>/g, ''), // Remove HTML tags from description
        imageUrl,
        guid: item.querySelector('guid')?.textContent,
      };
    });
    dispatch({ type: types.SAVE_RSS_XLML_DATA_SUCCESS, payload: feedData });
    // console.log('saveRssXmlDataResponse:', feedData);
    return feedData;
  } catch (error) {
    // console.error("Error checking file size:", error);
    dispatch({ type: types.SAVE_RSS_XLML_DATA_FAILURE });
  }
};
export const getSummarizerData = (token) => (dispatch) => {
  dispatch({ type: types.GET_SUMMARIZER_DATA_REQUEST });
  return axios
    .get(`${VITE_API_BASE_URL_NEWSMEDIA}summarize/news/articles/`, {
    // .get(`http://127.0.0.1:8000/expedichat/v0/summarize/news/articles/`, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      console.log('vishal', res?.data?.data);
      dispatch({ type: types.GET_SUMMARIZER_DATA_SUCCESS, payload: res?.data?.data });
      return res?.data?.data;
    }
    ).catch((err) => {
      // console.log('getSummarizerDataError:', err);
      dispatch({ type: types.GET_SUMMARIZER_DATA_FAILURE });
      return err;
    });
}

export const sendSummarizerData = (data, token) => (dispatch) => {
  // console.log("sendSummarizerData:", data);
  dispatch({ type: types.SEND_SUMMARIZER_DATA_REQUEST });
  return axios
    .post(`${VITE_API_BASE_URL_NEWSMEDIA}summarize/news/articles/`, data, {
    // .post(`http://127.0.0.1:8000/expedichat/v0/summarize/news/articles/`, data, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      // console.log('sendSummarizerDataResponse:', res.data);
      dispatch({ type: types.SEND_SUMMARIZER_DATA_SUCCESS });
      dispatch(getSummarizerData(token));
      return res.data;
    }).catch((err) => {
      console.log('sendSummarizerDataError:', err);
      dispatch({ type: types.SEND_SUMMARIZER_DATA_FAILURE });
      return err;
    });
}

export const getSummarizeGuids = (channel_name, token) => (dispatch) => {
  dispatch({ type: types.GET_SUMMARIZE_GUIDS_REQUEST });
  return axios
    .get(`${VITE_API_BASE_URL_NEWSMEDIA}get/summarize/guids/?channelName=${channel_name}`, {
    // .get(`http://127.0.0.1:8000/expedichat/v0/get/summarize/guids/?channelName=${channel_name}`, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      console.log('getSummarizeGuidsResponse:', res?.data?.data?.guid );
      dispatch({ type: types.GET_SUMMARIZE_GUIDS_SUCCESS, payload: res?.data?.data?.guid });
      return  res?.data?.data?.guid;
    }).catch((err) => {
      console.log('getSummarizeGuidsError:', err);
      dispatch({ type: types.GET_SUMMARIZE_GUIDS_FAILURE });
      return
    });
  }
export const deleteSummarizeGuids = (channel_name, guids, token) => (dispatch) => {
  dispatch({ type: types.DELETE_SUMMARIZE_GUIDS_REQUEST });
  return axios
    .delete(`${VITE_API_BASE_URL_NEWSMEDIA}delete/summarize/guids/?channelName=${channel_name}&guid=${JSON.stringify(guids)}`, {
    // .delete(`http://127.0.0.1:8000/expedichat/v0/delete/summarize/guids/?channelName=${channel_name}&guid=${JSON.stringify(guids)}`, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      // console.log('deleteSummarizeGuidsResponse:', res);
      dispatch({ type: types.DELETE_SUMMARIZE_GUIDS_SUCCESS });
      return res;
    }).catch((err) => {
      // console.log('deleteSummarizeGuidsError:', err);
      dispatch({ type: types.DELETE_SUMMARIZE_GUIDS_FAILURE });
      return err;
    }
  );
}


export const regenerateSummarizerData = (id, data, token) => (dispatch) => {
  dispatch({ type: types.REGENERATE_SUMMARIZER_DATA_REQUEST });
  return axios
    .patch(`${VITE_API_BASE_URL_NEWSMEDIA}summarize/news/articles/?news_id=${id}`, data, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      console.log('regenerateSummarizerDataResponse:', res);
      dispatch({ type: types.REGENERATE_SUMMARIZER_DATA_SUCCESS });
      console.log('Calling getSummarizerData with token:', token);
      dispatch(getSummarizerData(token));
      return res;
    }).catch((err) => {
      // console.log('regenerateSummarizerDataError:', err);
      dispatch({ type: types.REGENERATE_SUMMARIZER_DATA_FAILURE });
      return err;
    });
}

export const deleteSummarizerData = (id, token) => (dispatch) => {
  dispatch({ type: types.DELETE_SUMMARIZER_DATA_REQUEST });
  return axios
    .delete(`${VITE_API_BASE_URL_NEWSMEDIA}summarize/news/articles/?news_id=${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      // console.log('deleteSummarizerDataResponse:', res);
      dispatch({ type: types.DELETE_SUMMARIZER_DATA_SUCCESS });
      dispatch(getSummarizerData(token));
      return res;
    }).catch((err) => {
      // console.log('deleteSummarizerDataError:', err);
      dispatch({ type: types.DELETE_SUMMARIZER_DATA_FAILURE });
      return err;
    });
  }

  export const editSummarizerData = (id, data, token) => (dispatch) => {
    dispatch({ type: types.EDIT_SUMMARIZER_DATA_REQUEST });
    return axios
      .put(`${VITE_API_BASE_URL_NEWSMEDIA}summarize/news/articles/?news_id=${id}`, data, {
        // headers: {
        //   Authorization: `Bearer ${token.access}`,
        // },
      }).then((res) => {
        // console.log('editSummarizerDataResponse:', res);
        dispatch({ type: types.EDIT_SUMMARIZER_DATA_SUCCESS });
        return res;
      }).catch((err) => {
        // console.log('editSummarizerDataError:', err);
        dispatch({ type: types.EDIT_SUMMARIZER_DATA_FAILURE });
        return err;
      });
    }

export const deleteFinalNewsData = (id, token) => (dispatch) => {
  dispatch({ type: types.DELETE_FINAL_NEWS_DATA_REQUEST });
  return axios
    .delete(`${VITE_API_BASE_URL_NEWSMEDIA}final/news/crud/?news_id=${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      // console.log('deleteFinalNewsDataResponse:', res);
      dispatch({ type: types.DELETE_FINAL_NEWS_DATA_SUCCESS });
      dispatch(fetchFinalNewsData(token));
      return res;
    }).catch((err) => {
      // console.log('deleteFinalNewsDataError:', err);
      dispatch({ type: types.DELETE_FINAL_NEWS_DATA_FAILURE });
      return err;
    });
}


export const uploadImage = (payload, token) => (dispatch) => {
    
  dispatch({ type: types.UPLOAD_IMAGE_REQUEST });
  return axios
   .post(`${VITE_API_BASE_URL_NEWSMEDIA}generate/image/url/`, payload, {
      headers: {
        'Content-Type':'multipart/form-data',
      },
    }).then((response) => {
      // console.log('uploadImageResponse:', response);
      dispatch({ type: types.UPLOAD_IMAGE_SUCCESS, payload: response.data.data });
      return response?.data?.res_blob_url;
    }).catch((error) => {
      // console.log('uploadImageError:', error);
      dispatch({ type: types.UPLOAD_IMAGE_FAILURE });
      return error;
    });
}

export const generate_image_by_pexels = (payload, token) => (dispatch) => {
  // console.log("generate_image_by_pexels", payload)
  dispatch({ type: types.GENERATE_PEXELS_IMAGE_REQUEST });
  return axios
   .post(`${VITE_API_BASE_URL_NEWSMEDIA}generate/pexels/images/`, payload, {
      headers: {
        'Content-Type':'multipart/form-data',
      },
    }).then((response) => {
      console.log('generate_image_by_pexels:', response);
      dispatch({ type: types.GENERATE_PEXELS_IMAGE_SUCCESS, payload: response.data.data });
      return response?.data;
    }).catch((error) => {
      console.log('generate_image_by_pexels:', error);
      dispatch({ type: types.GENERATE_PEXELS_IMAGE_FAILURE });
      return error;
    });
}

export const generate_image_by_models = (payload, token) => (dispatch) => {
  // console.log("generate_image_by_models", payload)
  dispatch({ type: types.GENERATE_MODELS_IMAGE_REQUEST });
  return axios
   .post(`${VITE_API_BASE_URL_NEWSMEDIA}generate/models/images/`, payload, {
      headers: {
        'Content-Type':'multipart/form-data',
      },
    }).then((response) => {
      console.log('generate_image_by_models:', response);
      dispatch({ type: types.GENERATE_MODELS_IMAGE_SUCCESS, payload: response.data.data });
      return response?.data;
    }).catch((error) => {
      console.log('generate_image_by_models:', error);
      dispatch({ type: types.GENERATE_MODELS_IMAGE_FAILURE });
      return error;
    });
}
  

export const generate_humanize_content = (payload, token) => (dispatch) => {
  console.log("payload", payload)
  dispatch({ type: types.GENERATE_humanize_content_REQUEST });
  return axios
   .post(`${VITE_API_BASE_URL_NEWSMEDIA}generate/humanize/content/`, payload, {
      headers: {
        'Content-Type':'multipart/form-data',
      },
    }).then((response) => {
      // console.log('uploadImageResponse:', response);
      dispatch({ type: types.GENERATE_humanize_content_SUCCESS, payload: response.data.data });
      dispatch(getSummarizerData(token));
      return response;
    }).catch((error) => {
      // console.log('uploadImageError:', error);
      dispatch({ type: types.GENERATE_humanize_content_FAILURE });
      return error;
    });
}


export const fetchTrendData = (payload) => (dispatch) => {
  // console.log("payload", payload.path)
  dispatch({ type: types.FETCH_TRENDS_DATA_REQUEST });
  return axios
    .get(`${VITE_API_BASE_URL_NEWSMEDIA}google/trends/data/?csv_path=${payload.path}`,{
    // .get(`http://127.0.0.1:8000/expedichat/v0/google/trends/data/?csv_path=${payload.path}`, {
      // headers: {
      //   Authorization: Bearer ${token.access},
      // },
    }).then((res) => {
      // console.log('fetchFinalNewsDataResponse:', res);
      const data2 = JSON.parse(res?.data.data)
      dispatch({ type: types.FETCH_TRENDS_DATA_SUCCESS, payload: data2});
      return data2;
    }).catch((err) => {
      // console.log('fetchFinalNewsDataError:', err);
      dispatch({ type: types.FETCH_TRENDS_DATA_FAILURE });
      return err;
    });
}


export const generateGoogleNews = (data, token) => (dispatch) => {
  dispatch({ type: types.GENERATE_GOOGLE_NEWS_REQUEST });
  return axios
    .post(`${VITE_API_BASE_URL_NEWSMEDIA}generate/google/news/`, data, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      console.log('generateGoogleNewsResponse:', res);
      dispatch({ type: types.GENERATE_GOOGLE_NEWS_SUCCESS });
     
      return res;
    }).catch((err) => {
      // console.log('generateGoogleNewsError:', err);
      dispatch({ type: types.GENERATE_GOOGLE_NEWS_FAILURE });
      return err;
    });
}

// ---------------------------------------------------------------------------------------------------------------------------------------

// apply production api here



export const fetchFinalNewsData = (limit = 27, token) => (dispatch) => {
  dispatch({ type: types.FETCH_FINAL_NEWS_DATA_REQUEST });
  return axios
    .get(`${VITE_API_BASE_URL_NEWSMEDIA}final/news/crud/?limit=${limit}`, {
    // .get(`http://127.0.0.1:8000/expedichat/v0/final/news/crud/`, {
      // headers: {
      //   Authorization: Bearer ${token.access},
      // },
    }).then((res) => {
      console.log('fetchFinalNewsDataResponse:', res);
      dispatch({ type: types.FETCH_FINAL_NEWS_DATA_SUCCESS, payload: res.data.data });
      return res?.data?.data;
    }).catch((err) => {
      // console.log('fetchFinalNewsDataError:', err);
      dispatch({ type: types.FETCH_FINAL_NEWS_DATA_FAILURE });
      return err;
    });
}

export const fetchFinalNewsAllData = (token) => (dispatch) => {
  dispatch({ type: types.FETCH_FINAL_NEWS_ALL_DATA_REQUEST });
  return axios
    .get(`${VITE_API_BASE_URL_NEWSMEDIA}final/news/crud/?limit=0`, {
    // .get(`http://127.0.0.1:8000/expedichat/v0/final/news/crud/?limit=0`, {
      // headers: {
      //   Authorization: Bearer ${token.access},
      // },
    }).then((res) => {
      // console.log('fetchFinalNewsDataResponse:', res);
      dispatch({ type: types.FETCH_FINAL_NEWS_ALL_DATA_SUCCESS, payload: res.data.data });
      return res;
    }).catch((err) => {
      // console.log('fetchFinalNewsDataError:', err);
      dispatch({ type: types.FETCH_FINAL_NEWS_ALL_DATA_FAILURE });
      return err;
    });
}

export const publishSummarizerData = (data, token) => (dispatch) => {
  dispatch({ type: types.PUBLISH_SUMMARIZER_DATA_REQUEST });
  return axios
    .post(`${VITE_API_BASE_URL_NEWSMEDIA}final/news/crud/`, data, {
    // .post(`http://127.0.0.1:8000/expedichat/v0/final/news/crud/`, data, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      // console.log('publishSummarizerDataResponse:', res);
      dispatch({ type: types.PUBLISH_SUMMARIZER_DATA_SUCCESS });
      dispatch(fetchFinalNewsData(token));
      return res;
    }).catch((err) => {
      console.log('publishSummarizerDataError:', err);
      dispatch({ type: types.PUBLISH_SUMMARIZER_DATA_FAILURE });
      return err;
    });
}

export const editFinalNewsData = (id, data) => (dispatch) => {
  console.log("editFinalNewsData", id, data);
  dispatch({ type: types.EDIT_FINAL_NEWS_DATA_REQUEST });
  return axios
    .put(`${VITE_API_BASE_URL_NEWSMEDIA}final/news/crud/?news_id=${id}`, data, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      // console.log('editFinalNewsDataResponse:', res);
      dispatch({ type: types.EDIT_FINAL_NEWS_DATA_SUCCESS, payload: res.data });
      dispatch(fetchFinalNewsData());
      return res;
    }).catch((err) => {
      // console.log('editFinalNewsDataError:', err);
      dispatch({ type: types.EDIT_FINAL_NEWS_DATA_FAILURE });
      return err;
    });
  }

  export const userLogin = (payload) => (dispatch) => {
    dispatch({ type: types.USER_LOGIN_REQUEST });
    return axios
     .post(`${VITE_API_BASE_URL}login/`, payload, {
      }).then((response) => {
        // console.log('uploadImageResponse:', response);
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: response.data.token });
        // console.log("res", response)
        return response.data.token;
      }).catch((error) => {
        // console.log('uploadImageError:', error);
        dispatch({ type: types.USER_LOGIN_FAILURE });
        return error;
      });
  }

  export const userDetails = (token) => (dispatch) => {
    console.log("token", token)
    dispatch({ type: types.USER_DETAILS_REQUEST });
    return axios
    .get(`${VITE_API_BASE_URL}profile/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response) => {
        // console.log('uploadImageResponse:', response);
        dispatch({ type: types.USER_DETAILS_SUCCESS, payload: response.data });
        // console.log("userData", response)
        return response;
      }).catch((error) => {
        // console.log('uploadImageError:', error);
        dispatch({ type: types.USER_DETAILS_FAILURE });
        return error;
      });
  }

export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: types.LOGOUT });
    return 'Logout Successful';
  };
};
    

export const playGroundSaveData = (data, token) => (dispatch) => {
  console.log("data", data);
  dispatch({ type: types.PLAYGROUND_SAVE_DATA_REQUEST });
  return axios
    .post(`${VITE_API_BASE_URL_NEWSMEDIA}final/news/crud/`, data)
    .then((response) => {
      dispatch({ type: types.PLAYGROUND_SAVE_DATA_SUCCESS});
      return response;
    })
    .catch((error) => {
      dispatch({ type: types.PLAYGROUND_SAVE_DATA_FAILURE });
      return error;
    });
  }


export const generateCoupon = (data, token) => (dispatch) => {
  dispatch({ type: types.SEND_DATA_TO_GENERATE_COUPON_REQUEST });
  return axios
    .post(`${VITE_API_BASE_URL}generate/coupon/`, data, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      // console.log('generateCouponResponse:', res);
      dispatch({ type: types.SEND_DATA_TO_GENERATE_COUPON_SUCCESS });
      return res;
    }).catch((err) => {
      // console.log('generateCouponError:', err);
      dispatch({ type: types.SEND_DATA_TO_GENERATE_COUPON_FAILURE });
      return err;
    });
}

export const getGeneratedCoupon = (token) => (dispatch) => {
  dispatch({ type: types.GET_ALL_COUPON_REQUEST });
  return axios
    .get(`${VITE_API_BASE_URL}generate/coupon/`, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      console.log('getGeneratedCouponResponse:', res);
      dispatch({ type: types.GET_ALL_COUPON_SUCCESS, payload: res.data.data });
      return res;
    }).catch((err) => {
      // console.log('getGeneratedCouponError:', err);
      dispatch({ type: types.GET_ALL_COUPON_FAILURE });
      return err;
    });
}

export const deleteCoupon = (id, token) => (dispatch) => {
  dispatch({ type: types.DELETE_COUPON_REQUEST });
  return axios
    .delete(`${VITE_API_BASE_URL}generate/coupon/?couponId=${id}`, {
      // headers: {
      //   Authorization :`Bearer ${token.access}`,
      // },
    }).then((res) => {
      console.log('deleteCouponResponse:', res);
      dispatch({ type: types.DELETE_COUPON_SUCCESS });
      return res;
    }).catch((err) => {
      // console.log('deleteCouponError:', err);
      dispatch({ type: types.DELETE_COUPON_FAILURE });
      return err;
    }
  );
}

export const sendNotification = (data, token) => (dispatch) => {
  dispatch({ type: types.SEND_NOTIFICTION_REQUEST });
  return axios
    .post(`${VITE_API_BASE_URL_NEWSMEDIA}admin/notification/all/user/`, data, {
    // .post(`https://expedichatdev-testing.azurewebsites.net/expedichat/v0/admin/notification/all/user/`, data, {
      // headers: {
      //   Authorization: `Bearer ${token.access}`,
      // },
    }).then((res) => {
      // console.log('generateCouponResponse:', res);
      dispatch({ type: types.SEND_NOTIFICTION_SUCCESS });
      return res;
    }).catch((err) => {
      // console.log('generateCouponError:', err);
      dispatch({ type: types.SEND_NOTIFICTION_FAILURE });
      return err;
    });
}

export const postImageonFbPage = (data) => (dispatch) => {
  dispatch({ type: types.POST_ON_FB_PAGE_REQUEST });
  return axios
   .post('https://graph.facebook.com/v21.0/112103998582269/photos', data)
   .then((res) => {
      dispatch({ type: types.POST_ON_FB_PAGE_SUCCESS });
      return res.data;
    }).catch((err) => {
      dispatch({ type: types.POST_ON_FB_PAGE_FAILURE });
      return err;
    });
}



