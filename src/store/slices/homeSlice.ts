/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HomeState = {
  projectId: string;
  loading: boolean;
};

const initialState: HomeState = {
  projectId: "",
  loading: false
};

const homeSlice = createSlice({
  name: "submittalSlice",
  initialState,
  extraReducers(builder) {},
  reducers: {
    reset: () => initialState,
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setProjectId: (state, { payload }: PayloadAction<string>) => {
      state.projectId = payload;
    }
  }
});

export default homeSlice.reducer;

export const { reset: resetAuthState, setLoading } = homeSlice.actions;
