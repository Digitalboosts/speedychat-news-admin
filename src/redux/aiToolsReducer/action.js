import axios from 'axios';

import * as types from './actionType';

// const API_KEY = import.meta.env.VITE_API_BASE_URL;

// -----------------------------------------------------------------------------
// PAID TOOLS
// -----------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------
// COMMON UPLOAD PREVIEW URL API
// ------------------------------------------------------------------------------------------------------------

// Logout
export const removeToolFromStore = () =>
  (dispatch) => {
    dispatch({ type: types.LOGOUT });
    return 'Logout Successful';
  };


// Get Upload Preview URL
export const getUploadPreviewUrl = (payload,token) => (dispatch) => {
  const { formData } = payload;
  // console.log('Payload:', formData);
  dispatch({ type: types.GET_UPLOAD_PREVIEW_URL_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}generate/blob/url/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token.access}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('getUploadPreviewUrlResponse:', res.data);
      dispatch({ type: types.GET_UPLOAD_PREVIEW_URL_SUCCESS, payload: res.data });
      return res;
    })
    .catch((err) => {
      // console.log('getUploadPreviewUrlError:', err);
      dispatch({ type: types.GET_UPLOAD_PREVIEW_URL_FAILURE, payload: err });
      throw err;
    });
};

// ------------------------------------------------------------------------------------------------------------
// 1. SUMMARIZER:
// ------------------------------------------------------------------------------------------------------------

// Upload File
export const uploadSummarizerFile = (payload,token) => (dispatch) => {
  const  {formData}  = payload;
  // const payloadData = {formData, filetype: "summarizer",
  //   language: ["en"]};
  
  // console.log("payloadData",payloadData)
  dispatch({ type: types.UPLOAD_SUMMARIZER_FILE_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}process/summarizer/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token.access}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('uploadSummarizerFileResponse:', res.data);
      dispatch({ type: types.UPLOAD_SUMMARIZER_FILE_SUCCESS, payload: res.data });
      return res;
    })
    .catch((err) => {
      // console.log('uploadSummarizerFileError:', err);
      dispatch({ type: types.UPLOAD_SUMMARIZER_FILE_FAILURE, payload: err });
      throw err;
    });
};

// Upload Text
export const uploadSummarizerText = (payload,token) => (dispatch) => {
  const formData = payload;
  dispatch({ type: types.UPLOAD_SUMMARIZER_TEXT_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}process/summarizer/with_text/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token.access}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('uploadSummarizerTextResponse:', res.data);
      dispatch({ type: types.UPLOAD_SUMMARIZER_TEXT_SUCCESS, payload: res.data });
      return res;
    })
    .catch((err) => {
      // console.log('uploadSummarizerTextError:', err);
      dispatch({ type: types.UPLOAD_SUMMARIZER_TEXT_FAILURE, payload: err });
      throw err;
    });
};

// ------------------------------------------------------------------------------------------------------------
// 2. PPT Generator:
// ------------------------------------------------------------------------------------------------------------

// Post PPT Details :DONE>>>>>>>>>>>>>>
export const postPPTDetails = (payload,token) => (dispatch) => {
  const { formData } = payload;
  // console.log("formData:", formData)
  dispatch({ type: types.POST_PPT_DETAILS_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}ppt/generator/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token.access}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('postPPTDetailsResponse:', res);
      dispatch({ type: types.POST_PPT_DETAILS_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('postPPTDetailsError:', err);
      dispatch({ type: types.POST_PPT_DETAILS_FAILURE });
      throw err;
    });
};

// ------------------------------------------------------------------------------------------------------------
// 3. Image To Text:
// ------------------------------------------------------------------------------------------------------------

// Upload File :DONE>>>>>>>>>>>>>>

export const uploadImageToTextFile = (payload,token) => (dispatch) => {
  const { formData } = payload;
  // console.log("payload",payload)
  dispatch({ type: types.UPLOAD_SCANNED_TO_TEXT_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}scanned_pdf/text/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token.access}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('uploadScannedToTextFileResponse:', res);
      dispatch({ type: types.UPLOAD_SCANNED_TO_TEXT_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('uploadScannedToTextFileError:', err);
      dispatch({ type: types.UPLOAD_SCANNED_TO_TEXT_FAILURE });
      throw err;
    });
};

// ------------------------------------------------------------------------------------------------------------
// 4. MAKE HUMANIZED CONTENT:
// ------------------------------------------------------------------------------------------------------------
export const makeHumanizedContent = (payload,token) => (dispatch) => {
  // console.log('Payload:', payload, token);
  dispatch({ type: types.MAKE_HUMANIZED_CONTENT_REQUEST });

  return axios
    .post(`${API_KEY}humanized/content/`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then((res) => {
      console.log('makeHumanizedContent:', res ,payload);
      dispatch({ type: types.MAKE_HUMANIZED_CONTENT_SUCCESS, payload: res });
      return res;
    })
    .catch((err) => {
      console.error('makeHumanizedContent', err);
      dispatch({ type: types.MAKE_HUMANIZED_CONTENT_FAILURE, payload: err });
      throw err;
    });
};

// ------------------------------------------------------------------------------------------------------------
// 5. PERFORM UNDETECTABLE SEO:
// ------------------------------------------------------------------------------------------------------------
export const performUndetectableSeoAction = (payload,token) => (dispatch) => {
  // console.log('Payload:', payload, token);
  dispatch({ type: types.PERFORM_UNDETECTABLE_SEO_REQUEST });

  return axios
    .post(`${API_KEY}undetectable/seo/`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then((res) => {
      // console.log('Undetectable SEO Response:', res);
      dispatch({ type: types.PERFORM_UNDETECTABLE_SEO_SUCCESS, payload: res });
      return res;
    })
    .catch((err) => {
      console.error('Undetectable SEO Error:', err);
      dispatch({ type: types.PERFORM_UNDETECTABLE_SEO_FAILURE, payload: err });
      throw err;
    });
};

// ------------------------------------------------------------------------------------------------------------
// 6. Scanned To Native:
// ------------------------------------------------------------------------------------------------------------

// Upload File :DONE>>>>>>>>>>>>>>
export const uploadScannedToNativeFile = (payload,token) => (dispatch) => {
  const { formData} = payload;
  dispatch({ type: types.UPLOAD_SCANNED_TO_NATIVE_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}scan_pdf/native_pdf/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token.access}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('uploadScannedToNativeFileResponse:', res);
      dispatch({ type: types.UPLOAD_SCANNED_TO_NATIVE_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('uploadScannedToNativeFileError:', err);
      dispatch({ type: types.UPLOAD_SCANNED_TO_NATIVE_FAILURE });
      throw err;
    });
};

// ------------------------------------------------------------------------------------------------------------
// COMMON GET ALL FILES API
// ------------------------------------------------------------------------------------------------------------

// Get all Templates
export const getAllTemp = (payload) => (dispatch) => {
// eslint-disable-next-line no-shadow
  const { token, key } = payload;
  dispatch({ type: types.GET_ALL_TEMP_REQUEST });
  return axios
    .get(`${API_KEY}get/all/templates/?template_type=${key}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log('getAllResponse:', res.data);
     // eslint-disable-next-line object-shorthand
      dispatch({ type: types.GET_ALL_TEMP_SUCCESS, payload: { data: res.data, key: key } });
      return res;
    })
    .catch((err) => {
      // console.log('getAllError:', err);
      dispatch({ type: types.GET_ALL_TEMP_FAILURE });
      throw err;
    });
};

// Get all Files
export const getAllPaidToolFiles = (payload) => (dispatch) => {
  const { toolName, docs_id, token } = payload;
  dispatch({ type: types.GET_ALL_PAID_TOOL_FILES_REQUEST });
  return axios
    .get(`${API_KEY}get/tools/data/?docs_type=${toolName}&docs_id=${docs_id}`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then((res) => {
      // console.log('getAllPaidToolFilesResponse:', res);
      dispatch({
        type: types.GET_ALL_PAID_TOOL_FILES_SUCCESS,
        payload: { data: res.data, toolName: toolName },
      });
      return res;
    })
    .catch((err) => {
      // console.log('getAllPaidToolFilesError:', err);
      dispatch({ type: types.GET_ALL_PAID_TOOL_FILES_FAILURE });
    });
};

// ------------------------------------------------------------------------------------------------------------
// COMMON DELTE SINGLE/MULTIPLE FILES API
// ------------------------------------------------------------------------------------------------------------

// Delete single/multiple Files
export const deletePaidToolFiles = (payload) => (dispatch) => {
// eslint-disable-next-line no-shadow
  const { tools_data_id, token, filetype } = payload;
  // console.log('checkingTheDataIsComingCorrect:', tools_data_id, token);

  // Convert id array to a JSON string
  const paidToolsId = JSON.stringify(tools_data_id);
  // console.log('isds:', paidToolsId);

  dispatch({ type: types.DELETE_PAID_TOOL_FILES_REQUEST });

  const queryParams = new URLSearchParams();
  queryParams.append('tools_data_id', paidToolsId);
  queryParams.append('filetype', filetype);

  const options = {
    method: 'DELETE',
    url: `${API_KEY}delete/tools/data/?${queryParams.toString()}`,
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  };

  return axios
    .request(options)
    .then((res) => {
      // console.log('deletePaidToolFilesResponse:', res);
      dispatch({ type: types.DELETE_PAID_TOOL_FILES_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('deletePaidToolFilesError:', err);
      dispatch({ type: types.DELETE_PAID_TOOL_FILES_FAILURE });
      throw err;
    });
};

// -----------------------------------------------------------------------------
// FREE TOOLS
// -----------------------------------------------------------------------------

export const barcodeScanner = (payload) => (dispatch) => {
  // eslint-disable-next-line no-shadow
  const { formData, token } = payload;
  dispatch({ type: types.BARCODE_SCANNER_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}barcode/reader/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('barcodeScannerResponse:', res);
      dispatch({ type: types.BARCODE_SCANNER_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('barcodeScannerError:', err);
      dispatch({ type: types.BARCODE_SCANNER_FAILURE });
      throw err;
    });
};

export const pdfSplitter = (payload) => (dispatch) => {
  // eslint-disable-next-line no-shadow
  const { formData, token } = payload;
  dispatch({ type: types.PDF_SPLITTER_REQUEST });
  return axios
    .post(`${API_KEY}split/pdf/`, formData, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then((res) => {
      // console.log('splitPdfResponse:', res);
      dispatch({ type: types.PDF_SPLITTER_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('splitPdfError:', err);
      dispatch({ type: types.PDF_SPLITTER_FAILURE });
      throw err;
    });
};

export const compressPdf = (payload) => (dispatch) => {
  // eslint-disable-next-line no-shadow
  const { formData, token } = payload;
  dispatch({ type: types.COMPRESS_PDF_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}compress/pdf/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('compressPdfResponse:', res);
      dispatch({ type: types.COMPRESS_PDF_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('compressPdfError:', err);
      dispatch({ type: types.COMPRESS_PDF_FAILURE });
      throw err;
    });
};

export const mergePdf = (payload) => (dispatch) => {
  // eslint-disable-next-line no-shadow
  const { formData, token } = payload;
  dispatch({ type: types.MERGE_PDF_REQUEST });
  return axios
    .post(`${API_KEY}merge/pdf/`, formData, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then((res) => {
      // console.log('mergePdfResponse:', res);
      dispatch({ type: types.MERGE_PDF_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('mergePdfError:', err);
      dispatch({ type: types.MERGE_PDF_FAILURE });
      throw err;
    });
};

export const pdfToJpg = (payload) => (dispatch) => {
  // eslint-disable-next-line no-shadow
  const { formData, token } = payload;
  dispatch({ type: types.PDF_TO_JPG_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}pdf/jpg/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('pdfToJpgResponse:', res);
      dispatch({ type: types.PDF_TO_JPG_REQUEST });
      return res;
    })
    .catch((err) => {
      // console.log('pdfToJpgError:', err);
      dispatch({ type: types.PDF_TO_JPG_REQUEST });
      throw err;
    });
};

export const docstopdf = (payload) => (dispatch) => {
  // eslint-disable-next-line no-shadow
  const { formData, token } = payload;
  dispatch({ type: types.DOCS_TO_PDF_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}docs/pdf/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('docs to pdf Response:', res);
      dispatch({ type: types.DOCS_TO_PDF_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('docs to pdf Error:', err);
      dispatch({ type: types.DOCS_TO_PDF_FAILURE });
      throw err;
    });
};

export const pdfToBase64 = (payload) => (dispatch) => {
  // eslint-disable-next-line no-shadow
  const { formData, token } = payload;
  dispatch({ type: types.PDF_BASE64_STRING_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}pdf/base64/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('pdfToBase64Response:', res);
      dispatch({ type: types.PDF_BASE64_STRING_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('pdfToBase64Error:', err);
      dispatch({ type: types.PDF_BASE64_STRING_FAILURE });
      throw err;
    });
};

export const base64ToPdf = (payload) => (dispatch) => {
  // eslint-disable-next-line no-shadow
  const { formData, token } = payload;
  dispatch({ type: types.BASE64_STRING_TO_PDF_REQUEST });
  return axios
    .post(`${API_KEY}base64/pdf/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log('base64ToPdfResponse:', res);
      dispatch({ type: types.BASE64_STRING_TO_PDF_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('base64ToPdfError:', err);
      dispatch({ type: types.BASE64_STRING_TO_PDF_FAILURE });
      throw err;
    });
};

export const imageToPdf = (payload) => (dispatch) => {
  // eslint-disable-next-line no-shadow
  const { formData, token } = payload;
  dispatch({ type: types.IMAGE_TO_PDF_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}image/pdf/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('imageToPdfResponse:', res);
      dispatch({ type: types.IMAGE_TO_PDF_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('imageToPdfError:', err);
      dispatch({ type: types.IMAGE_TO_PDF_FAILURE });
      throw err;
    });
};

// Handle Text
export const handleTextRequest = () => ({
  type: types.HANDEL_TEXT_REQUEST,
});

export const handleTextSuccess = () => ({
  type: types.HANDEL_TEXT_SUCCESS,
});

export const handleTextFailure = () => ({
  type: types.HANDEL_TEXT_FAILURE,
});

export const handleText = (text) => ({
  type: types.HANDEL_TEXT_SUCCESS,
  payload: text,
});

// Action
export const textToPdf = (payload,token) => (dispatch) => {
  dispatch({ type: types.TEXT_TO_PDF_REQUEST });
  // console.log("payloaddata",payload, token)
  return axios
    .post(`${API_KEY}text/pdf/`, payload, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then((res) => {
      // console.log('textToPdfResponse:', res);
      dispatch({ type: types.TEXT_TO_PDF_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('textToPdfErr:', err);
      dispatch({ type: types.TEXT_TO_PDF_FAILURE });
      throw err;
    });
};

export const zipExtractor = (payload) => (dispatch) => {
  // eslint-disable-next-line no-shadow
  const { formData, token } = payload;
  dispatch({ type: types.ZIP_EXTRACTOR_REQUEST });
  const options = {
    method: 'POST',
    url: `${API_KEY}zip/unzip/`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios(options)
    .then((res) => {
      // console.log('zipExtractorResponse:', res);
      dispatch({ type: types.ZIP_EXTRACTOR_SUCCESS });
      return res;
    })
    .catch((err) => {
      // console.log('zipExtractorError:', err);
      dispatch({ type: types.ZIP_EXTRACTOR_FAILURE });
      throw err;
    });
};
