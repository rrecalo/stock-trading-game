import { configureStore } from '@reduxjs/toolkit'
import positionsReducer from './redux/positionsSlice'
import pricesReducer from './redux/pricesSlice'
import capitalReducer from './redux/capitalSlice'

export default configureStore({
  reducer: {
    positions: positionsReducer,
    prices: pricesReducer,
    capital: capitalReducer,
  },
})