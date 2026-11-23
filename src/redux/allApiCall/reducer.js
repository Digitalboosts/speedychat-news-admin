import * as types from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  allNewsData: [],
  allRssFeedsUrl: [],
  allCategories: [],
  allXmlData: [],
  allSummarizerData: [],
  allFinalNewsData: [],
  allFinalNewsDashboardData: [],
  userToken: [],
  allUserData: {},
  allTrendsData: [],
  allCoupon : [],
  allProductionNewsData: [],
  summarizeGuids : [],
};

const reducer = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  console.log('reducerpayload:', action, 'type:', type, 'payload:', payload);
  switch (type) {
    // CREATE AI CONTENT
    case types.SEND_NEWSDATA_REQUEST:
      // Handle CREATE_AI_CONTENT_REQUEST action
      return { ...state, isLoading: true };
    case types.SEND_NEWSDATA_SUCCESS:
      // Handle CREATE_AI_CONTENT_SUCCESS action
      return { ...state, isLoading: false };
    case types.SEND_NEWSDATA_FAILURE:
      // Handle CREATE_AI_CONTENT_FAILURE action
      return { ...state, isLoading: false, isError: true };

    // SAVE AI CONTENT
    case types.SAVE_NEWSDATA_REQUEST:
      // Handle SAVE_AI_CONTENT_REQUEST action
      return { ...state, isLoading: true };
    case types.SAVE_NEWSDATA_SUCCESS:
      // Handle SAVE_AI_CONTENT_SUCCESS action
      return { ...state, isLoading: false };
    case types.SAVE_NEWSDATA_FAILURE:
      // Handle SAVE_AI_CONTENT_FAILURE action
      return { ...state, isLoading: false, isError: true };

    // ALL AI ASSISTANT LIST
    case types.GET_ALL_NEWSDATA_REQUEST:
      // Handle GET_ALL_AI_ASSISTANT_REQUEST action
      return { ...state, isLoading: true };
    case types.GET_ALL_NEWSDATA_SUCCESS:
      // Handle GET_ALL_AI_ASSISTANT_SUCCESS action
      return { ...state, isLoading: false, allAIAssistantList: payload };
    case types.GET_ALL_NEWSDATA_FAILURE:
      // Handle GET_ALL_AI_ASSISTANT_FAILURE action
      return { ...state, isLoading: false, isError: true };

    // DELETE TOOLS LIST
    case types.DELETE_NEWSDATA_REQUEST:
      // Handle DELETE_AI_TOOLS_REQUEST action
      return { ...state, isLoading: true };
    case types.DELETE_NEWSDATA_SUCCESS:
      // Handle DELETE_AI_TOOLS_SUCCESS action
      return { ...state, isLoading: false };
    case types.DELETE_NEWSDATA_FAILURE:
      // Handle DELETE_AI_TOOLS_FAILURE action
      return { ...state, isLoading: false, isError: true };

      // GET ALL RSS FEED URL
    case types.GET_ALL_RSS_FEED_URL_REQUEST:
      // Handle GET_ALL_RSS_FEED_URL_REQUEST action
      return { ...state, isLoading: true };
    case types.GET_ALL_RSS_FEED_URL_SUCCESS:
      // Handle GET_ALL_RSS_FEED_URL_SUCCESS action
      return { ...state, isLoading: false, allRssFeedsUrl: payload };
    case types.GET_ALL_RSS_FEED_URL_FAILURE:
      // Handle GET_ALL_RSS_FEED_URL_FAILURE action
      return { ...state, isLoading: false, isError: true  };

      // GET CATEGORIES
    case types.GET_CATEGORIES_REQUEST:
      // Handle GET_CATEGORIES_REQUEST action
      return { ...state, isLoading: true };
    case types.GET_CATEGORIES_SUCCESS:
      // Handle GET_CATEGORIES_SUCCESS action
      return { ...state, isLoading: false, allCategories: payload };
    case types.GET_CATEGORIES_FAILURE:
      // Handle GET_CATEGORIES_FAILURE action
      return { ...state, isLoading: false, isError: true };

      // SAVE RSS XML DATA
    case types.SAVE_RSS_XLML_DATA_REQUEST:
      // Handle SAVE_RSS_XLML_DATA_REQUEST action
      return { ...state, isLoading: true };
    case types.SAVE_RSS_XLML_DATA_SUCCESS:
      // Handle SAVE_RSS_XLML_DATA_SUCCESS action
      return { ...state, isLoading: false , allXmlData :payload };
    case types.SAVE_RSS_XLML_DATA_FAILURE:
      // Handle SAVE_RSS_XLML_DATA_FAILURE action
      return { ...state, isLoading: false, isError: true };

    // SEND SUMMARIZER DATA
    case types.SEND_SUMMARIZER_DATA_REQUEST:
      // Handle SEND_SUMMARIZER_DATA_REQUEST action
      return { ...state, isLoading: true };
    case types.SEND_SUMMARIZER_DATA_SUCCESS:
      // Handle SEND_SUMMARIZER_DATA_SUCCESS action
      return { ...state, isLoading: false };
    case types.SEND_SUMMARIZER_DATA_FAILURE:
      // Handle SEND_SUMMARIZER_DATA_FAILURE action
      return { ...state, isLoading: false, isError: true };

    // GET SUMMARIZER DATA
    case types.GET_SUMMARIZER_DATA_REQUEST:
      // Handle GET_SUMMARIZER_DATA_REQUEST action
      return { ...state, isLoading: true };
    case types.GET_SUMMARIZER_DATA_SUCCESS:
      // Handle GET_SUMMARIZER_DATA_SUCCESS action
      return { ...state, isLoading: false, allSummarizerData: payload };
    case types.GET_SUMMARIZER_DATA_FAILURE:
      // Handle GET_SUMMARIZER_DATA_FAILURE action
      return { ...state, isLoading: false, isError: true };  

    // GET FinalNews Data
    case types.FETCH_FINAL_NEWS_DATA_REQUEST:
      // Handle GET_SUMMARIZER_DATA_REQUEST action
      return { ...state, isLoading: true };
    case types.FETCH_FINAL_NEWS_DATA_SUCCESS:
      // Handle GET_SUMMARIZER_DATA_SUCCESS action
      return { ...state, isLoading: false, allFinalNewsData: payload };
    case types.FETCH_FINAL_NEWS_DATA_FAILURE:
      // Handle GET_SUMMARIZER_DATA_FAILURE action
      return { ...state, isLoading: false, isError: true };


    // GET FinalNews Data
    case types.FETCH_FINAL_NEWS_ALL_DATA_REQUEST:
      // Handle GET_SUMMARIZER_DATA_REQUEST action
      return { ...state, isLoading: true };
    case types.FETCH_FINAL_NEWS_ALL_DATA_SUCCESS:
      // Handle GET_SUMMARIZER_DATA_SUCCESS action
      return { ...state, isLoading: false, allFinalNewsDashboardData: payload };
    case types.FETCH_FINAL_NEWS_ALL_DATA_FAILURE:
      // Handle GET_SUMMARIZER_DATA_FAILURE action
      return { ...state, isLoading: false, isError: true };


    // GET FinalNews Data
    case types.USER_LOGIN_REQUEST:
      // Handle GET_SUMMARIZER_DATA_REQUEST action
      return { ...state, isLoading: true };
    case types.USER_LOGIN_SUCCESS:
      // Handle GET_SUMMARIZER_DATA_SUCCESS action
      return { ...state, isLoading: false, userToken: payload };
    case types.USER_LOGIN_FAILURE:
      // Handle GET_SUMMARIZER_DATA_FAILURE action
      return { ...state, isLoading: false, isError: true };

    // GET FinalNews Data
    case types.USER_DETAILS_REQUEST:
      // Handle GET_SUMMARIZER_DATA_REQUEST action
      return { ...state, isLoading: true };
    case types.USER_DETAILS_SUCCESS:
      // Handle GET_SUMMARIZER_DATA_SUCCESS action
      return { ...state, isLoading: false, allUserData: payload };
    case types.USER_DETAILS_FAILURE:
      // Handle GET_SUMMARIZER_DATA_FAILURE action
      return { ...state, isLoading: false, isError: true };


    // GET FinalNews Data
    case types.FETCH_TRENDS_DATA_REQUEST:
      // Handle GET_SUMMARIZER_DATA_REQUEST action
      return { ...state, isLoading: true };
    case types.FETCH_TRENDS_DATA_SUCCESS:
      // Handle GET_SUMMARIZER_DATA_SUCCESS action
      return { ...state, isLoading: false, allTrendsData: payload };
    case types.FETCH_TRENDS_DATA_FAILURE:
      // Handle GET_SUMMARIZER_DATA_FAILURE action
      return { ...state, isLoading: false, isError: true };

    case types.GET_ALL_COUPON_REQUEST:  
      return { ...state, isLoading: true };
    case types.GET_ALL_COUPON_SUCCESS:
      return { ...state, isLoading: false, allCoupon: payload };
    case types.GET_ALL_COUPON_FAILURE:
      return { ...state, isLoading: false, isError: true };
    
    case types.SEND_FINAL_NEWS_TO_PRODUCTION_DB_REQUEST:
      return { ...state, isLoading: true };
    case types.SEND_FINAL_NEWS_TO_PRODUCTION_DB_SUCCESS:
      return { ...state, isLoading: false, allProductionNewsData: payload };
    case types.SEND_FINAL_NEWS_TO_PRODUCTION_DB_FAILURE:
      return { ...state, isLoading: false, isError: true };
    
    case types.GET_SUMMARIZE_GUIDS_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_SUMMARIZE_GUIDS_SUCCESS:
      return { ...state, isLoading: false, summarizeGuids: payload };
    case types.GET_SUMMARIZE_GUIDS_FAILURE:
      return { ...state, isLoading: false, isError: true };


    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export { reducer };
