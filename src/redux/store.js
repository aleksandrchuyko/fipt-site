import { configureStore } from '@reduxjs/toolkit';
import { userlistReducer } from './userlistSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { usersApi } from './users/users-api';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authReducer } from './auth';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    userlist: userlistReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      usersApi.middleware,
    ];
  },
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
