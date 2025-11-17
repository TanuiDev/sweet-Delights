import { createSlice } from "@reduxjs/toolkit";

export type userSate = {
  token: string | null;
  user: {
    user_id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
  } | null;
};

const initialState: userSate = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
