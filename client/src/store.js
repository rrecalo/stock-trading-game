import { configureStore } from '@reduxjs/toolkit'
import positionsReducer from './redux/positionsSlice'
import pricesReducer from './redux/pricesSlice'
import capitalReducer from './redux/capitalSlice'
import simulationReducer from './redux/simulationSlice'
import portfolioReducer from './redux/portfolioSlice'

export default configureStore({
  reducer: {
    positions: positionsReducer,
    prices: pricesReducer,
    capital: capitalReducer,
    portfolio: portfolioReducer,
    simulating: simulationReducer,
  },
})