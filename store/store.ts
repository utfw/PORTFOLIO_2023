import { combineReducers, configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Actor } from "next/font/google";

interface State {
  Index:boolean,
  Scroll:number,
  Height:number
  Content:string[]
}

const initialState:State ={
  Index:false,
  Scroll:0,
  Height:0,
  Content:["fescaro","samsung","cjone","kakao","netflix"]
}

const widthSlice = createSlice({
  name:'width',
  initialState,
  reducers:{
    setWidth:(state, action:PayloadAction<number>)=>{
      state.Height = action.payload;
    }
  }
})

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

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<string[]>) => {
      state.Content = action.payload;
    },
    }
  }
);

const rootReducer = combineReducers({
  index: indexSlice.reducer,
  scrollPosition: scrollPositionSlice.reducer,
  sectionHeights: sectionHeightSlice.reducer,
  openDoc: validationSlice.reducer,
  content: contentSlice.reducer,
  windowWidth: widthSlice.reducer
});

export const {toggleIndex} = indexSlice.actions;
export const {updateIndex} = scrollPositionSlice.actions;
export const {getSectionHeight} = sectionHeightSlice.actions;
export const {openDoc} = validationSlice.actions;
export const {setWidth} = widthSlice.actions;

export const store = configureStore({
  reducer:rootReducer
})

export type RootState = ReturnType<typeof store.getState>;