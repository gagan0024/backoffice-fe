import { combineReducers } from "@reduxjs/toolkit";
import {api} from "../api/api";
import adminLoginSlice from "../slices/loingSlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  adminLoginSlice,
});

export default rootReducer;
