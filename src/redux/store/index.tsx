import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { api } from '../api/api'
import middleware from '../api/middleware'
import rootReducer from '../rootReducer/rootReducer'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['adminLoginSlice'],
  blacklist: [api.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  ...middleware,
  // @ts-ignore
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export default store;
