/* eslint-disable no-fallthrough */
import * as types from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  allFiles: [],
  allChatUploadedFiles: [],
  summarizeFile: [],
  allChat: [],
  singleChatHistory: [],
  conversation_id: '',
  humanizedContentHistory: [],
  allAIAssistantList: [],
  humanizedChat: '',
  humanizedContent: [],
  undetectableSeo: [],
  allChatHistory: [],
};



const reducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action
) => {
  const {type, payload} = action;
  switch (type) {
    // ---------------------------------------------------------- REQUEST ---------------------------------------------------------------
    // UPLOAD FILE
    case types.UPLOAD_REQUEST:

    // GET UPLOADED FILES REQUEST
    case types.GET_UPLOADED_FILES_REQUEST:

    // DELETE CHAT HISTORY REQUEST
    case types.DELETE_CHAT_HISTORY_REQUEST:

    // DELETE ALL CHAT HISTORY REQUEST
    case types.DELETE_ALL_CHAT_HISTORY_REQUEST:

    // NEW CHAT REQUEST
    case types.NEW_CHAT_REQUEST:
      return {...state, isLoading: true};


    // HUMANIZED CONTENT HISTORY REQUEST
    case types.GET_HUMANIZED_CONTENT_HISTORY_REQUEST:

    // MAKE HUMANIZED CONTENT REQUEST
    // eslint-disable-next-line no-duplicate-case
    case types.GET_HUMANIZED_CONTENT_HISTORY_REQUEST:


    // GET ALL MESSAGES REQUEST
    case types.GET_CHAT_HISTORY_REQUEST:

    // SINGLE CHAT HISTORY REQUEST
    case types.MAKE_HUMANIZED_CONTENT_REQUEST:
      return {...state, isLoading: true};

    // ---------------------------------------------------------- SUCCESS ---------------------------------------------------------------

    

    // UPLOAD FILE
    case types.UPLOAD_SUCCESS:

    // DELETE CHAT HISTORY SUCCESS
    case types.DELETE_CHAT_HISTORY_SUCCESS:

    // DELETE ALL CHAT HISTORY SUCCESS
    case types.DELETE_ALL_CHAT_HISTORY_SUCCESS:

    // NEW CHAT SUCCESS
    case types.NEW_CHAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        allFiles: payload,
        allChat: payload,
      };
    // SINGLE CHAT HISTORY SUCCESS
    case types.GET_SINGLE_CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleChatHistory: payload.messages,
        conversation_id: payload.conversationId,
      };
    // HUMANIZED CONTENT HISTORY SUCCESS
    case types.GET_HUMANIZED_CONTENT_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        humanizedContentHistory: payload,
      };

    // PERFORM HUMANIZED CONTENT REQUEST
    case types.PERFORM_HUMANIZED_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        humanizedContent: payload,
      };

    // MAKE HUMANIZED CONTENT SUCCESS
    case types.MAKE_HUMANIZED_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        humanizedChat: payload,
      };

    // MAKE HUMANIZED CONTENT SUCCESS
    case types.GET_CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allChatHistory: payload,
      };

    // GET UPLOADED FILES SUCCESS
    case types.GET_UPLOADED_FILES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allChatUploadedFiles: payload,
      };

    // ---------------------------------------------------------- FAILURE ---------------------------------------------------------------

    
    // UPLOAD FILE
    case types.UPLOAD_FAILURE:

    // GET UPLOADED FILES FAILURE
    case types.GET_UPLOADED_FILES_FAILURE:

    // DELETE CHAT HISTORY FAILURE
    case types.DELETE_CHAT_HISTORY_FAILURE:

    // DELETE ALL CHAT HISTORY FAILURE
    case types.DELETE_ALL_CHAT_HISTORY_FAILURE:

    // NEW CHAT FAILURE
    case types.NEW_CHAT_FAILURE:
      return {...state, isLoading: false, isError: true};

    // CHAT HISTORY FAILURE
    case types.GET_CHAT_HISTORY_FAILURE:
      return {...state, isLoading: false, isError: true};

    // HUMANIZED CONTENT HISTORY FAILURE
    case types.GET_HUMANIZED_CONTENT_HISTORY_FAILURE:
      return {...state, isLoading: false, humanizedContentHistory: payload, isError: true};
    // MAKE HUMANIZED CONTENT FAILURE
    case types.PERFORM_UNDETECTABLE_SEO_FAILURE:
      return {...state, isLoading: false, isError: true};

    // MAKE HUMANIZED CONTENT FAILURE
    case types.PERFORM_HUMANIZED_CONTENT_FAILURE:
      return {...state, isLoading: false, isError: true};

    // MAKE HUMANIZED CONTENT FAILURE
    case types.MAKE_HUMANIZED_CONTENT_FAILURE:
      return {...state, isLoading: false, isError: true};

    case types.CLEAR_SINGLE_CHAT_HISTORY:
      return {
        ...state,
        singleChatHistory: [],
        conversation_id: '',
      };

    // ALL AI ASSISTANT LIST
    case types.GET_ALL_AI_ASSISTANT_REQUEST:
      // Handle GET_ALL_AI_ASSISTANT_REQUEST action
      return {...state, isLoading: true};
    case types.GET_ALL_AI_ASSISTANT_SUCCESS:
      // Handle GET_ALL_AI_ASSISTANT_SUCCESS action
      return {...state, isLoading: false, allAIAssistantList: payload};
    case types.GET_ALL_AI_ASSISTANT_FAILURE:
      // Handle GET_ALL_AI_ASSISTANT_FAILURE action
      return {...state, isLoading: false, isError: true};

    // DELETE TOOLS LIST
    case types.DELETE_AI_TOOLS_REQUEST:
      // Handle DELETE_AI_TOOLS_REQUEST action
      return {...state, isLoading: true};
    case types.DELETE_AI_TOOLS_SUCCESS:
      // Handle DELETE_AI_TOOLS_SUCCESS action
      return {...state, isLoading: false};
    case types.DELETE_AI_TOOLS_FAILURE:
      // Handle DELETE_AI_TOOLS_FAILURE action
      return {...state, isLoading: false, isError: true};

    case types.PERFORM_UNDETECTABLE_SEO_REQUEST:
      return {...state, loading: true};
    case types.PERFORM_UNDETECTABLE_SEO_SUCCESS:
      return {...state, loading: false, undetectableSeo: payload};
    // eslint-disable-next-line no-duplicate-case
    case types.PERFORM_UNDETECTABLE_SEO_FAILURE:
      return {...state, loading: false, isError: true};

    // ------------------- Handle LOGOUT ------------------------------
    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export {reducer};
