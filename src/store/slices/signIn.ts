/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentUser, LoginRequest, LoginResponse } from "models/user";
import * as api from "../../services/login-service";

type AuthState = {
  currentUser: CurrentUser | null;
  loading: boolean;
};

const initialState: AuthState = {
  currentUser: null,
  loading: false
};

export const login = createAsyncThunk(
  "auth/login",
  async (request: LoginRequest, { rejectWithValue }) => {
    const response = await api.Login(request);
    console.log(response.data);
    if (response.data.success === true) {
      const { data } = response;
      console.log(data);
      return { ...data };
    }
    console.log(response.data);
    return rejectWithValue(response.data);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, { payload }: PayloadAction<LoginResponse>) => {
        state.currentUser = payload.response;
        localStorage.setItem("currentUser", JSON.stringify(payload.response));
      }
    );
  }
});

export default authSlice.reducer;

export const { reset, setLoading } = authSlice.actions;
