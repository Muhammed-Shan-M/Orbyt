import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../../shared/types/authState";


const initialState: AuthState = {
  user: null,
  accessToken:null,
  isAuthenticated: false,
  isAuthChecked: false
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (state, action: PayloadAction<Omit<AuthState, "isAuthChecked">>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.isAuthenticated = action.payload.isAuthenticated;
    },

    setAuthChecked: (state, action:PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isAuthChecked = true
    },
  },
});

export const { setCredentials, logout, setAuthChecked, setAccessToken } = authSlice.actions;

export default authSlice.reducer;