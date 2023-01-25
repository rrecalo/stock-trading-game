import { createSlice} from '@reduxjs/toolkit'

export const stockHistorySlice = createSlice({
    name: 'history',
    initialState: [],
    reducers: {
        updateHistory: (state, action)=>{
            //if the state already exists, filter out the old stock data and replace it with an up-to-date version
            if(state.length > 0){
            return state.filter(obj => obj.ticker !== action.payload.ticker).concat([{ticker: action.payload.ticker, history: action.payload.history}]);;
            }
            else
            return [{ticker: action.payload.ticker, history: action.payload.history}];
        },

       
    }
})

export const {updateHistory} = stockHistorySlice.actions;

export default stockHistorySlice.reducer;