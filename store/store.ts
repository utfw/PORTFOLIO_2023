import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      const toggle = !state.index;
       
    }
  }
})