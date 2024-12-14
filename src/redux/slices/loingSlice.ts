import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

const adminLoginSlice = createSlice({
  name: "loginToken",
  initialState,
  reducers: {
    logoutAction: (): AuthState => initialState,
    accessAdminTokken(state, action) {
      state.accessToken = action.payload;
    },
  },
});
export const { accessAdminTokken, logoutAction } = adminLoginSlice.actions;
export default adminLoginSlice.reducer;
