import { configureStore } from '@reduxjs/toolkit'
import timeSelectedReducer from './timeSelectedSlice'

export default configureStore({
    reducer: {
        timeSelectedSlice: timeSelectedReducer,
    }
  })