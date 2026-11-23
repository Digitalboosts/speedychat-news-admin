// -------------------------------------------------------------------------------------------------------------------------------------
// Author: Sourav Kumar
// Date: 11-12-2023
// -------------------------------------------------------------------------------------------------------------------------------------

import axios from 'axios';

import * as types from './actionType';

// import config from '../../../../config/index';
// const API_KEY = import.meta.env.VITE_API_BASE_URL;
// const token = sessionStorage.getItem('jwt_access_token');

// -------------------------------------------------------------------------------------------------------------------------------------
// CHAT WINDOW
// -------------------------------------------------------------------------------------------------------------------------------------

// Logout
/* eslint-disable arrow-body-style */
export const removeFileFromStore = () => {
  return dispatch => {
    dispatch({ type: types.LOGOUT });
    return 'Logout Successful';
  };
};
// console.log("API_KEY:",API_KEY)

// UPLOAD FILE
export const uploadFile = (formData,token) => dispatch => {

  // console.log("token:",token)
  dispatch({ type: types.UPLOAD_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}fileupload/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token.access}`, // Ensure the token is available
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then(response => {
      console.log('Data from file upload:', response.data);
      dispatch({ type: types.UPLOAD_SUCCESS, payload: response.data });
      return response.data;
    })
    .catch(error => {
      console.log('Error from action:', error.response);
      dispatch({ type: types.UPLOAD_FAILURE, payload: error });
      throw error;
    });
};

// Logout
export const clearHistory = () => {
  return dispatch => {
    dispatch({ type: types.CLEAR_SINGLE_CHAT_HISTORY });
    return 'history cleared';
  };
};

// GET UPLOADED FILES LIST
export const getUploadedFilesList = (token) => dispatch => {
  // console.log('token', token);
  dispatch({ type: types.GET_UPLOADED_FILES_REQUEST });
  return axios
    .get(`${API_KEY}getallfiles/`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then(res => {
      // console.log('uploadedFilesList:', res);
      dispatch({
        type: types.GET_UPLOADED_FILES_SUCCESS,
        payload: res.data.data,
      });
      return res;
    })
    .catch(err => {
      // console.log('uploadedFilesListError:', err);
      dispatch({ type: types.GET_UPLOADED_FILES_FAILURE, payload: err });
      throw err;
    });
};

// NEW CHAT
export const newChat = ( payload,token) => dispatch => {
  console.log("token:",token)

  // console.log('Payload:', payload);

  dispatch({ type: types.NEW_CHAT_REQUEST });

  return axios
    .post(`${API_KEY}new/chat/`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then(res => {
      // console.log('newChatRes:', res);
      dispatch({ type: types.NEW_CHAT_SUCCESS, payload: res.data });
      dispatch(getAllHumanizedContentHistory(token));
      return res;
    })
    .catch(err => {
      // console.log('newChatError:', err);
      dispatch({ type: types.NEW_CHAT_FAILURE, payload: err });
      throw err;
    });
};

// GET ALL CHAT LIST ID
// export const getAllChatIdHistory = (token:any, id:any) => async (dispatch:any) => {
//   console.log("check_id:", id);
//   dispatch({ type: types.GET_CHAT_HISTORY_REQUEST });
//   try {
//     const res = await axios.get(`${API_KEY}get/chat/history_by_id?chat_id=${id}`, {
//       headers: {
//         Authorization: `Bearer ${token.access}`,
//       },
//     });

//     console.log('chatHistory Response:', res);
//     dispatch({ type: types.GET_CHAT_HISTORY_SUCCESS, payload: res.data.msg });
//     return res;
//   } catch (err) {
//     console.log('chatHistory ListError:', err);
//     dispatch({ type: types.GET_CHAT_HISTORY_FAILURE, payload: err });
//     throw err;
//   }
// };


// GET ALLCHAT HISTORY
export const getAllChatHistory = (token) => async dispatch => {
  // console.log('token:', token);

  dispatch({ type: types.GET_CHAT_HISTORY_REQUEST });

  try {
    const response = await axios.get(
      `${API_KEY}get/chat/history_by_id`,
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      },
    );

    // console.log('chatHistory Response:', response.data.msg);
    dispatch({
      type: types.GET_CHAT_HISTORY_SUCCESS,
      payload: response.data.msg,
    });
    return response;
  } catch (err) {
    // console.log('chatHistory Response:', err);
    dispatch({ type: types.GET_CHAT_HISTORY_FAILURE, payload: err });
    throw err;
  }
};



// GET HUMANIZED CONTENT HISTORY
export const getAllHumanizedContentHistory = (token) => dispatch => {
  console.log("getAllHumanizedContentHistory:",token)
  dispatch({ type: types.GET_HUMANIZED_CONTENT_HISTORY_REQUEST });
  return axios
    .get(`${API_KEY}get/humanized/data/`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then(res => {
      console.log('getAllHumanizedContentHistory:', res);
      dispatch({
        type: types.GET_HUMANIZED_CONTENT_HISTORY_SUCCESS,
        payload: res?.data?.chat_data,
      });
      return res.data.chat_data;
    })
    .catch(err => {
      console.log('getAllHumanizedContentHistory', err);
      dispatch({
        type: types.GET_HUMANIZED_CONTENT_HISTORY_FAILURE,
        payload: [],
      });
      throw err;
    });
};



// GET SINGLE CHAT ID HISTORY
// eslint-disable-next-line no-shadow
export const getSingleChatHistory = (token, id) => dispatch => {
  // console.log("token:",token)

  dispatch({ type: types.GET_SINGLE_CHAT_HISTORY_REQUEST });

  return axios
    .get(`${API_KEY}get/chat/history_by_id?conversation_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      // console.log('getSingleChatHistory Response:', res.data);
      const transformedMessages = res.data.msg?.map(item => {
        const userMessage = { isUser: true, text: item.question };
        const replyMessage = { isUser: false, text: item.answer };

        return [userMessage, replyMessage];
      });
      const formattedMessages = [].concat(...transformedMessages);
      dispatch({
        type: types.GET_SINGLE_CHAT_HISTORY_SUCCESS,
        payload: {
          messages: formattedMessages,
          conversationId: res.data.msg[0].conversation_id,
        },
      });
      return res;
    })
    .catch(err => {
      // console.error('getSingleChatHistory Error:', err);

      let errorMessage = 'An error occurred while fetching chat history.';

      if (err.response) {
        // The request was made, but the server responded with a non-2xx status code
        errorMessage = `Server responded with status ${err.response.status}.`;
        console.error('Server response data:', err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from the server.';
        console.error('Request details:', err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = `Error setting up the request: ${err.message}`;
      }

      dispatch({
        type: types.GET_SINGLE_CHAT_HISTORY_FAILURE,
        payload: errorMessage,
      });
      throw err; // Rethrow the error for further handling if needed
    });
};
// eslint-disable-next-line no-shadow
export const deleteSingleChatHistory = (token, chatId) => dispatch => {
  dispatch({ type: types.DELETE_CHAT_HISTORY_REQUEST });
  return axios
    .delete(`${API_KEY}delete/chat/heading?chat_data_index=${chatId}`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then(res => {
      // console.log('getdeleteSingleChatHistoryResponse:', res);
      dispatch({ type: types.DELETE_CHAT_HISTORY_SUCCESS });
      dispatch(getAllHumanizedContentHistory(token));
      return res;
    })
    .catch(err => {
      // console.log('getAllAIToolsError:', err);
      dispatch({ type: types.DELETE_CHAT_HISTORY_FAILURE });
      throw err;
    });
};

// -------------------------------------------------------------------------------------------------------------------------------------
// AI TOOLS
// -------------------------------------------------------------------------------------------------------------------------------------
// Get all AI Assistant
export const getAllAITools = payload => dispatch => {
  // eslint-disable-next-line no-shadow
  const { token } = payload;
  // console.log('AI:checkingTheDataIsComingCorect:', token);
  dispatch({ type: types.GET_ALL_AI_ASSISTANT_REQUEST });
  return axios
    .get(`${API_KEY}ai_assistent/crud/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      // console.log('getAllAIToolsResponse:', res.data);
      dispatch({ type: types.GET_ALL_AI_ASSISTANT_SUCCESS, payload: res.data });
      return res;
    })
    .catch(err => {
      // console.log('getAllAIToolsError:', err);
      dispatch({ type: types.GET_ALL_AI_ASSISTANT_FAILURE });
      return err;
    });
};

// Delete single/multiple AI Tools Files
export const deleteAIToolsRes = (payload) => (dispatch) => {
  // eslint-disable-next-line no-shadow
  const { id, token } = payload;
  // console.log('checkingTheDataIsComingCorrect:', id, token);

  // Convert id array to a JSON string
  const assistentId = JSON.stringify(id);
  // console.log("isds:", assistentId)

  dispatch({ type: types.DELETE_AI_TOOLS_REQUEST });

  const options = {
    method: 'delete',
    url: `${API_KEY}ai_assistent/crud/?Assistent_id=${assistentId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(options)
    .then((res) => {
      // console.log('deleteAIToolsResResponse:', res);
      dispatch({ type: types.DELETE_AI_TOOLS_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('deleteAIToolsResError:', err);
      dispatch({ type: types.DELETE_AI_TOOLS_FAILURE, error: err });
      return Promise.reject(err);
    });
};



// Reset File Reducer
export const resetFileReducer = () => dispatch => {
  dispatch({ type: types.RESET_FILE_REDUCER_REQUEST });
  return 'Logout Successful';
};
