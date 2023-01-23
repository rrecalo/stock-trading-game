import { createSlice} from '@reduxjs/toolkit'

export const dayCounterReducer = createSlice({
    name: 'dayCounter',
    initialState: 0,
    reducers: {
        incrementDays (state, action){
            return state+action.payload;
        }
    }
})

export const {incrementDays} = dayCounterReducer.actions;

export default dayCounterReducer.reducer;