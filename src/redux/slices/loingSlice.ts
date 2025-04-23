import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  role: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  role: null,
};

const adminLoginSlice = createSlice({
  name: "loginToken",
  initialState,
  reducers: {
    logoutAction: (): AuthState => initialState,
    accessAdminTokken(state, action) {
      state.accessToken = action.payload;
    },
    setAdminRole(state, action) {
      state.role = action.payload;
    },
  },
});
export const { accessAdminTokken, logoutAction, setAdminRole } =
  adminLoginSlice.actions;
export default adminLoginSlice.reducer;
