import { createSlice} from '@reduxjs/toolkit'

export const tradeSelection = createSlice({
    name: 'tradeSelection',
    initialState: "",
    reducers: {
        updateTradeSelection: (state, action)=>{
            return action.payload;
        }
    }
})

export const {updateTradeSelection} = tradeSelection.actions;

export default tradeSelection.reducer;