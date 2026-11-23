import * as types from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  textEditerText: '',
  summaryAllFiles: [],
  resumeAllFiles: [],
  pptAllFiles: [],
  humanizeContentAllFiles: [],
  undetectableSeoAllFiles: [],
  scannedToTextAllFiles: [],
  scannedToNativeAllFiles: [],
  resumeTemp: [],
  pptTemp: [],
};

const reducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    // -----------------------------------------------------------------------------
    // PAID TOOLS
    // -----------------------------------------------------------------------------

    // 1.Summarizer: FILE
    case types.UPLOAD_SUMMARIZER_FILE_REQUEST:
      return { ...state, isLoading: true };
    case types.UPLOAD_SUMMARIZER_FILE_SUCCESS:
      return { ...state, isLoading: false };
    case types.UPLOAD_SUMMARIZER_FILE_FAILURE:
      return { ...state, isLoading: false };

    // 1.Summarizer: TEXT
    case types.UPLOAD_SUMMARIZER_TEXT_REQUEST:
      return { ...state, isLoading: true };
    case types.UPLOAD_SUMMARIZER_TEXT_SUCCESS:
      return { ...state, isLoading: false };
    case types.UPLOAD_SUMMARIZER_TEXT_FAILURE:
      return { ...state, isLoading: false };

    // 2.PPT Generator
    case types.POST_PPT_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case types.POST_PPT_DETAILS_SUCCESS:
      return { ...state, isLoading: false };
    case types.POST_PPT_DETAILS_FAILURE:
      return { ...state, isLoading: false };

    // 3.MAKE HUMANIZED CONTENT
    case types.MAKE_HUMANIZED_CONTENT_REQUEST:
      return { ...state, isLoading: true };
    case types.MAKE_HUMANIZED_CONTENT_SUCCESS:
      return { ...state, isLoading: false };
    case types.MAKE_HUMANIZED_CONTENT_FAILURE:
      return { ...state, isLoading: false };

    // 4.Assured SEO
    case types.PERFORM_UNDETECTABLE_SEO_REQUEST:
      return { ...state, isLoading: true };
    case types.PERFORM_UNDETECTABLE_SEO_SUCCESS:
      return { ...state, isLoading: false };
    case types.PERFORM_UNDETECTABLE_SEO_FAILURE:
      return { ...state, isLoading: false };

    // 5.Scanned To Text
    case types.UPLOAD_SCANNED_TO_TEXT_REQUEST:
      return { ...state, isLoading: true };
    case types.UPLOAD_SCANNED_TO_TEXT_SUCCESS:
      return { ...state, isLoading: false };
    case types.UPLOAD_SCANNED_TO_TEXT_FAILURE:
      return { ...state, isLoading: false };

    // 6.Scanned To Native
    case types.UPLOAD_SCANNED_TO_NATIVE_REQUEST:
      return { ...state, isLoading: true };
    case types.UPLOAD_SCANNED_TO_NATIVE_SUCCESS:
      return { ...state, isLoading: false };
    case types.UPLOAD_SCANNED_TO_NATIVE_FAILURE:
      return { ...state, isLoading: false };

    // COMMON GET ALL FILES API
    case types.GET_ALL_PAID_TOOL_FILES_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_ALL_PAID_TOOL_FILES_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      let finalPayload = null;
      
      if (payload.toolName === 'ppt_data') {
        finalPayload = { ...state, isLoading: false, pptAllFiles: payload.data };
      } else if (payload.toolName === 'summarizer') {
        finalPayload = {
          ...state,
          isLoading: false,
          summaryAllFiles: payload.data,
        };
      } else if (payload.toolName === 'resume_data') {
        finalPayload = {
          ...state,
          isLoading: false,
          resumeAllFiles: payload.data,
        };
      } else if (payload.toolName === 'scanned_to_text') {
        finalPayload = {
          ...state,
          isLoading: false,
          scannedToTextAllFiles: payload.data,
        };
      } else if (payload.toolName === 'scan_to_native') {
        finalPayload = {
          ...state,
          isLoading: false,
          scannedToNativeAllFiles: payload.data,
        };
      } else if (payload.toolName === 'humanized_content') {
        finalPayload = {
          ...state,
          isLoading: false,
          humanizeContentAllFiles: payload.data,
        };
      } else if (payload.toolName === 'assured_seo') {
        finalPayload = {
          ...state,
          isLoading: false,
          undetectableSeoAllFiles: payload.data,
        };
      }
      return finalPayload;
    case types.GET_ALL_PAID_TOOL_FILES_FAILURE:
      return { ...state, isLoading: false };

    // COMMON DELTE SINGLE/MULTIPLE FILES API
    case types.DELETE_PAID_TOOL_FILES_REQUEST:
      return { ...state, isLoading: true };
    case types.DELETE_PAID_TOOL_FILES_SUCCESS:
      return { ...state, isLoading: false };
    case types.DELETE_PAID_TOOL_FILES_FAILURE:
      return { ...state, isLoading: false };

    // GET ALL RESUME TEMPLATES
    case types.GET_ALL_TEMP_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_ALL_TEMP_SUCCESS:
     // eslint-disable-next-line no-case-declarations
      let finalTempPayload = null;
      if (payload.key === 'resume') {
        finalTempPayload = {
          ...state,
          isLoading: false,
          resumeTemp: payload.data.msg,
        };
      } else if (payload.key === 'ppt') {
        finalTempPayload = {
          ...state,
          isLoading: false,
          pptTemp: payload.data.data,
        };
      }
      return finalTempPayload;

    case types.GET_ALL_TEMP_FAILURE:
      return { ...state, isLoading: false };

    // UPLOADE OLD RESUME
    case types.UPLOAD_OLD_RESUME_REQUEST:
      return { ...state, isLoading: true };
    case types.UPLOAD_OLD_RESUME_SUCCESS:
      return { ...state, isLoading: false };
    case types.UPLOAD_OLD_RESUME_FAILURE:
      return { ...state, isLoading: false };

    // UPLOAD PREVIEW URL
    case types.GET_UPLOAD_PREVIEW_URL_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_UPLOAD_PREVIEW_URL_SUCCESS:
      return { ...state, isLoading: false };
    case types.GET_UPLOAD_PREVIEW_URL_FAILURE:
      return { ...state, isLoading: false };

    // -----------------------------------------------------------------------------
    // FREE TOOLS
    // -----------------------------------------------------------------------------

    case types.BARCODE_SCANNER_REQUEST:
      // Handle BARCODE_SCANNER_REQUEST action
      return { ...state, isLoading: true };
    case types.BARCODE_SCANNER_SUCCESS:
      // Handle BARCODE_SCANNER_SUCCESS action
      return { ...state, isLoading: false };
    case types.BARCODE_SCANNER_FAILURE:
      // Handle BARCODE_SCANNER_FAILURE action
      return { ...state, isLoading: false };

    case types.PDF_SPLITTER_REQUEST:
      // Handle PDF_SPLITTER_REQUEST action
      return { ...state, isLoading: true };
    case types.PDF_SPLITTER_SUCCESS:
      // Handle PDF_SPLITTER_SUCCESS action
      return { ...state, isLoading: false };
    case types.PDF_SPLITTER_FAILURE:
      // Handle PDF_SPLITTER_FAILURE action
      return { ...state, isLoading: false };

    case types.COMPRESS_PDF_REQUEST:
      // Handle COMPRESS_PDF_REQUEST action
      return { ...state, isLoading: true };
    case types.COMPRESS_PDF_SUCCESS:
      // Handle COMPRESS_PDF_SUCCESS action
      return { ...state, isLoading: false };
    case types.COMPRESS_PDF_FAILURE:
      // Handle COMPRESS_PDF_FAILURE action
      return { ...state, isLoading: false };

    case types.MERGE_PDF_REQUEST:
      // Handle MERGE_PDF_REQUEST action
      return { ...state, isLoading: true };
    case types.MERGE_PDF_SUCCESS:
      // Handle MERGE_PDF_SUCCESS action
      return { ...state, isLoading: false };
    case types.MERGE_PDF_FAILURE:
      // Handle MERGE_PDF_FAILURE action
      return { ...state, isLoading: false };

    case types.PDF_TO_JPG_REQUEST:
      // Handle PDF_TO_JPG_REQUEST action
      return { ...state, isLoading: true };
    case types.PDF_TO_JPG_SUCCESS:
      // Handle PDF_TO_JPG_SUCCESS action
      return { ...state, isLoading: false };
    case types.PDF_TO_JPG_FAILURE:
      // Handle PDF_TO_JPG_FAILURE action
      return { ...state, isLoading: false };

    case types.PDF_ELECTRONICS_SIGN_REQUEST:
      // Handle PDF_ELECTRONICS_SIGN_REQUEST action
      return { ...state, isLoading: true };
    case types.PDF_ELECTRONICS_SIGN_SUCCESS:
      // Handle PDF_ELECTRONICS_SIGN_SUCCESS action
      return { ...state, isLoading: false };
    case types.PDF_ELECTRONICS_SIGN_FAILURE:
      // Handle PDF_ELECTRONICS_SIGN_FAILURE action
      return { ...state, isLoading: false };

    case types.PDF_BASE64_STRING_REQUEST:
      // Handle PDF_BASE64_STRING_REQUEST action
      return { ...state, isLoading: true };
    case types.PDF_BASE64_STRING_SUCCESS:
      // Handle PDF_BASE64_STRING_SUCCESS action
      return { ...state, isLoading: false };
    case types.PDF_BASE64_STRING_FAILURE:
      // Handle PDF_BASE64_STRING_FAILURE action
      return { ...state, isLoading: false };

    case types.BASE64_STRING_TO_PDF_REQUEST:
      // Handle BASE64_STRING_TO_PDF_REQUEST action
      return { ...state, isLoading: true };
    case types.BASE64_STRING_TO_PDF_SUCCESS:
      // Handle BASE64_STRING_TO_PDF_SUCCESS action
      return { ...state, isLoading: false };
    case types.BASE64_STRING_TO_PDF_FAILURE:
      // Handle BASE64_STRING_TO_PDF_FAILURE action
      return { ...state, isLoading: false };

    case types.IMAGE_TO_PDF_REQUEST:
      // Handle IMAGE_TO_PDF_REQUEST action
      return { ...state, isLoading: true };
    case types.IMAGE_TO_PDF_SUCCESS:
      // Handle IMAGE_TO_PDF_SUCCESS action
      return { ...state, isLoading: false };
    case types.IMAGE_TO_PDF_FAILURE:
      // Handle IMAGE_TO_PDF_FAILURE action
      return { ...state, isLoading: false };

    case types.HANDEL_TEXT_REQUEST:
      // Handle TEXT_TO_PDF_REQUEST action
      return { ...state, isLoading: true };
    case types.HANDEL_TEXT_SUCCESS:
      // Handle TEXT_TO_PDF_SUCCESS action
      return { ...state, isLoading: false, textEditerText: payload };
    case types.HANDEL_TEXT_FAILURE:
      // Handle TEXT_TO_PDF_FAILURE action
      return { ...state, isLoading: false };

    case types.TEXT_TO_PDF_REQUEST:
      // Handle TEXT_TO_PDF_REQUEST action
      return { ...state, isLoading: true };
    case types.TEXT_TO_PDF_SUCCESS:
      // Handle TEXT_TO_PDF_SUCCESS action
      return { ...state, isLoading: false };
    case types.TEXT_TO_PDF_FAILURE:
      // Handle TEXT_TO_PDF_FAILURE action
      return { ...state, isLoading: false };

    case types.DOCS_TO_PDF_REQUEST:
      // Handle TEXT_TO_PDF_REQUEST action
      return { ...state, isLoading: true };
    case types.DOCS_TO_PDF_SUCCESS:
      // Handle TEXT_TO_PDF_SUCCESS action
      return { ...state, isLoading: false };
    case types.DOCS_TO_PDF_FAILURE:
      // Handle TEXT_TO_PDF_FAILURE action
      return { ...state, isLoading: false };

    // ZIP EXTRACTOR TOOL
    case types.ZIP_EXTRACTOR_REQUEST:
      // Handle ZIP_EXTRACTOR_REQUEST action
      return { ...state, isLoading: true };
    case types.ZIP_EXTRACTOR_SUCCESS:
      // Handle ZIP_EXTRACTOR_SUCCESS action
      return { ...state, isLoading: false };
    case types.ZIP_EXTRACTOR_FAILURE:
      // Handle ZIP_EXTRACTOR_FAILURE action
      return { ...state, isLoading: false };

    // ------------------- Handle LOGOUT ------------------------------
    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export { reducer };
