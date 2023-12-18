import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux-slices/authSlice"
import checkboxReducer from "../redux-slices/checkBoxSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    checkbox: checkboxReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
