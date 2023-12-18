import { createSlice } from "@reduxjs/toolkit";

const localAuth = () => {
  const storedAuth = localStorage.getItem("auth");
  if (storedAuth && JSON.parse(storedAuth).isAuthenticated) {
    return JSON.parse(storedAuth).isAuthenticated;
  } else {
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated: false }));
    return false;
  }
};

const localAuthL = () => {
  const storedAuth = localStorage.getItem("auth");
  if (storedAuth) {
    const authObject = JSON.parse(storedAuth);
    authObject.isAuthenticated = false;
    localStorage.setItem("auth", JSON.stringify(authObject));
  }
};

const initialState = {
  isAuthenticated: localAuth(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localAuthL()
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
