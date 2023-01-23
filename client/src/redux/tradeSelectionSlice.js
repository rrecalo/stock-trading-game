import { createSlice} from '@reduxjs/toolkit'

export const tradeSelection = createSlice({
    name: 'tradeSelection',
    initialState: "SPY",
    reducers: {
        updateTradeSelection: (state, action)=>{
            return action.payload.ticker;
        }
    }
})

export const {updateTradeSelection} = tradeSelection.actions;

export default tradeSelection.reducer;