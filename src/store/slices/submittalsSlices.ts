/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubmittalListResponse, SubmittalLog } from "models/submittal-log";
import * as api from "services/submittals-services";

type SubmittalState = {
  projectId: string;
  list: SubmittalLog[];
  loading: boolean;
};

export const initialState: SubmittalState = {
  projectId: "",
  list: [],
  loading: false
};

export const getSubmittalList = createAsyncThunk(
  "submittal/list",
  async () => {
    const response = await api.GetSubmittals();
    // if (response.remote === "success") {
    const { data } = response;
    return { ...data };
  }
  // return rejectWithValue(response.error.errors);
  // }
);

const submittalSlice = createSlice({
  name: "submittalSlice",
  initialState,
  reducers: {
    reset: () => initialState,
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubmittalList.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getSubmittalList.fulfilled,
        (state, { payload }: PayloadAction<SubmittalListResponse>) => {
          state.list = payload.response;
        }
      );
  }
});

export default submittalSlice.reducer;

export const { reset, setLoading } = submittalSlice.actions;
