import { combineReducers, configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Actor } from "next/font/google";

interface State {
  Index:boolean,
  Scroll:number,
  Height:number
}

const initialState:State ={
  Index:false,
  Scroll:0,
  Height:0
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

const validationSlice = createSlice({
  name:'doc',
  initialState,
  reducers:{
    openDoc:(state, action:PayloadAction<boolean>) =>{
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

const sectionHeightSlice = createSlice({
  name:'height',
  initialState,
  reducers:{
    getSectionHeight:(state, action:PayloadAction<number>) =>{
      state.Height = action.payload;
    }
  }
})

const rootReducer = combineReducers({
  index: indexSlice.reducer,
  scrollPosition: scrollPositionSlice.reducer,
  sectionHeights: sectionHeightSlice.reducer,
  openDoc: validationSlice.reducer
});

export const {toggleIndex} = indexSlice.actions;
export const {updateIndex} = scrollPositionSlice.actions;
export const {getSectionHeight} = sectionHeightSlice.actions;
export const {openDoc} = validationSlice.actions;

export const store = configureStore({
  reducer:rootReducer
})

export type RootState = ReturnType<typeof store.getState>;