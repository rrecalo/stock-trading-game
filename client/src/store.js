import { configureStore } from '@reduxjs/toolkit'
import positionsReducer from './redux/positionsSlice'
import pricesReducer from './redux/pricesSlice'
import capitalReducer from './redux/capitalSlice'
import simulationReducer from './redux/simulationSlice'
import portfolioReducer from './redux/portfolioSlice'
import tradeSelectionReducer from './redux/tradeSelectionSlice'
import dayCounterReducer from './redux/dayCounterSlice'

export default configureStore({
  reducer: {
    positions: positionsReducer,
    prices: pricesReducer,
    capital: capitalReducer,
    portfolio: portfolioReducer,
    tradeSelection: tradeSelectionReducer,
    simulating: simulationReducer,
    dayCounter : dayCounterReducer,

  },
})