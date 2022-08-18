/* eslint-disable no-param-reassign */
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

export const { reset, setProjectId, setLoading } = homeSlice.actions;
