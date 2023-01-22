import { createSlice} from '@reduxjs/toolkit'

export const tradeSelection = createSlice({
    name: 'tradeSelection',
    initialState: "SPY",
    reducers: {
        buy: (state, action)=>{
            return action.payload.ticker;
        }
    }
})

export const {update} = tradeSelection.actions;

export default tradeSelection.reducer;