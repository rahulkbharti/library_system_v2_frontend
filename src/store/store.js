import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { persistReducer, persistStore, 
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 
} from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import { createStateSyncMiddleware } from 'redux-state-sync';
import { withReduxStateSync } from 'redux-state-sync';

import authReducer from "./features/auth/authSlice";

// Redux State Sync Config
const syncConfig = {
  blacklist: [PERSIST, REHYDRATE], // ignore redux-persist internal actions
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [
    encryptTransform({
      secretKey: 'your-secret-key', // use env var in production
      onError: (err) => console.error('Encryption error:', err),
    }),
  ],
};

// Wrap reducer with sync & persist
const syncedReducer = withReduxStateSync(rootReducer);
const persistedReducer = persistReducer(persistConfig, syncedReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(createStateSyncMiddleware(syncConfig)),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
