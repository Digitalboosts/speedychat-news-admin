import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // Use session storage
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { reducer as AuthReducer } from './authReducer/reducer';
// import { reducer as AiChatReducer } from './aiChatReducer/reducer';
// import { reducer as AiToolsReducer } from './aiToolsReducer/reducer';
import { reducer as Allapicall } from './allApiCall/reducer';


const rootReducer = combineReducers({ Allapicall });

const persistConfig = {
  key: 'root',
  storage: storageSession, // Use session storage
  // whitelist: ["AuthReducer"], // Specify which parts of the store to persist (in this case, AuthReducer)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

 const store = createStore(persistedReducer, applyMiddleware(thunk));

 const persistor = persistStore(store);

export  { persistor, store };
