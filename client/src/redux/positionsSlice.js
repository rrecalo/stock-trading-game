import { createSlice} from '@reduxjs/toolkit'

//use current() for testing!!!

export const positionsSlice = createSlice({
    name: 'positions',
    initialState: [],
    reducers: {
        buy: (state, action)=>{
            
            
            let obj = state.find(obj => obj.ticker === action.payload.ticker);
            var amt = 0;
            if(obj !==undefined){
                amt = obj.amount;
            }
            return state.filter(obj => obj.ticker !== action.payload.ticker).concat([{ticker: action.payload.ticker, amount: amt+action.payload.amount, cost: action.payload.cost}]);;
        },
        sell: (state, action)=>{
            
            let obj = state.find(obj => obj.ticker === action.payload.ticker);
            var amt = 0;
            if(obj !== undefined){
                amt = obj.amount;
            }
            return state.filter(obj => obj.ticker !== action.payload.ticker).concat([{ticker: action.payload.ticker, amount: amt-action.payload.amount, cost: action.payload.cost}]);;
        }
    }
})

export const {buy, sell} = positionsSlice.actions;

export default positionsSlice.reducer;