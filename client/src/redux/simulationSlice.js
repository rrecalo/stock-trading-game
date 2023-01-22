import { createSlice} from '@reduxjs/toolkit'

//use current() for testing!!!

export const simulationSlice = createSlice({
    name: 'simulating',
    initialState: {state : false, isLooping : false},
    reducers: {
        StartSimulation: (state, action)=>{
            return {state : true, isLooping : state.isLooping};
        },
        EndSimulation: (state, action)=>{
            return {state : false, isLooping : state.isLooping};
        },
        toggleLoop: (state, action)=>{
            console.log({state : state.state, isLooping : !state.isLooping});
            return {state : state.state, isLooping : !state.isLooping};
        }
    }
})

export const {StartSimulation, EndSimulation, toggleLoop} = simulationSlice.actions;

export default simulationSlice.reducer;