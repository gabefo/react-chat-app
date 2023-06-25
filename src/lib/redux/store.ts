import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import { reducer } from './rootReducer'

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export type RootStore = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useReduxDispatch<AppDispatch>()

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
