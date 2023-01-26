import { createSlice} from '@reduxjs/toolkit'

export const portfolioReducer = createSlice({
    name: 'portfolio',
    initialState: {value:10000, history: [10000], view: 0},
    reducers: {
        updatePortfolio: (state, action)=>{
            return {...state, value:action.payload.value, history: action.payload.history};
        },
        setView: (state, action)=>{
            //0 == Short-term 
            //1 == Long-term
            return {...state, view: action.payload.view}
        }
       
    }
})

export const {updatePortfolio, setView} = portfolioReducer.actions;

export default portfolioReducer.reducer;