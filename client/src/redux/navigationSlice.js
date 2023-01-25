import { createSlice} from '@reduxjs/toolkit'

export const navigationReducer = createSlice({
    name: 'navigation',
    initialState: "",
    reducers: {
        updateCurrentPath: (state, action)=>{
            return action.payload.path;
        },
       
    }
})

export const {updatePortfolio} = navigationReducer.actions;

export default navigationReducer.reducer;