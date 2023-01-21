import { createSlice} from '@reduxjs/toolkit'

export const capitalSlice = createSlice({
    name: 'capital',
    initialState: 10000,
    reducers: {
        incrementCapital: (state, action)=>{
            return state+action.payload.amount;
        },
        decrementCapital: (state, action)=>{
            return state-action.payload.amount;
        }
       
    }
})

export const {incrementCapital, decrementCapital} = capitalSlice.actions;

export default capitalSlice.reducer;