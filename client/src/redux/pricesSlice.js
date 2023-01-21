import { createSlice} from '@reduxjs/toolkit'

export const pricesSlice = createSlice({
    name: 'prices',
    initialState: [],
    reducers: {
        update: (state, action)=>{
            if(state.length > 0){
            return state.filter(obj => obj.ticker !== action.payload.ticker).concat([{ticker: action.payload.ticker, price: action.payload.price}]);;
            }
            else
            return [{ticker: action.payload.ticker, price: action.payload.price}];
        },
       
    }
})

export const {update} = pricesSlice.actions;

export default pricesSlice.reducer;