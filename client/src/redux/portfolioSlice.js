import { createSlice} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'

export const portfolioReducer = createSlice({
    name: 'portfolio',
    initialState: 0,
    reducers: {
        updatePortfolio: (state, action)=>{
            return action.payload.value;
        },
       
    }
})

export const {updatePortfolio} = portfolioReducer.actions;

export default portfolioReducer.reducer;