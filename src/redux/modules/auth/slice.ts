import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLogout: false,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    loginAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user?.account || user;
      state.isAuthenticated = true;
      state.isLogout = false;
    },
    logoutAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLogout = true;
    },
  },
});

export const { loginAuth, logoutAuth } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLogout = (state: RootState) => state.auth.isLogout;
