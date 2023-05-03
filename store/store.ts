import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface toggleState {
  index:boolean
}

const initialState:toggleState ={
  index:false
}
const indexSlice = createSlice({
  name:'index',
  initialState,
  reducers:{
    toggleIndex:(state, action:PayloadAction<boolean>) =>{
     state.index = action.payload;
    }
  }
})
export const {toggleIndex} = indexSlice.actions;
export const store = configureStore({
  reducer:indexSlice.reducer,
})

export type RootState = ReturnType<typeof store.getState>;