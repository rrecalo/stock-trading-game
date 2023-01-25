import { createSlice} from '@reduxjs/toolkit'

export const pricesSlice = createSlice({
    name: 'prices',
    initialState: [],
    reducers: {
        update: (state, action)=>{
            //if the state already exists, filter out the old stock data and replace it with an up-to-date version
            if(state.length > 0){
            return state.filter(obj => obj.ticker !== action.payload.ticker).concat([{ticker: action.payload.ticker, price: action.payload.price, last: action.payload.last, history: action.payload.history}]);;
            }
            else
            return [{ticker: action.payload.ticker, price: action.payload.price, last: action.payload.last ,history: action.payload.history}];
        },

       
    }
})

export const {update} = pricesSlice.actions;

export default pricesSlice.reducer;