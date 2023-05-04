import { combineReducers, configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  Index:boolean,
  Scroll:number
}

const initialState:State ={
  Index:false,
  Scroll:0
}

const indexSlice = createSlice({
  name:'index',
  initialState,
  reducers:{
    toggleIndex:(state, action:PayloadAction<boolean>) =>{
     state.Index = action.payload;
    }
  }
})

const scrollPositionSlice = createSlice({
  name:'scroll',
  initialState,
  reducers:{
    updateIndex:(state, action:PayloadAction<number>) =>{
      state.Scroll = action.payload;
    }
  }
})

const rootReducer = combineReducers({
  index: indexSlice.reducer,
  scrollPosition: scrollPositionSlice.reducer,
});

export const {toggleIndex} = indexSlice.actions;
export const {updateIndex} = scrollPositionSlice.actions;

export const store = configureStore({
  reducer:rootReducer
})

export type RootState = ReturnType<typeof store.getState>;