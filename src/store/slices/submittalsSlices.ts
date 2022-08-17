/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from "services/submittals-services";

type SubmittalState = {
  projectId: string;
  loading: boolean;
};

export const initialState: SubmittalState = {
  projectId: "",
  loading: false
};

export const getSubmittalList = createAsyncThunk(
  "submittal/list",
  async (projectId: string, { rejectWithValue }: any) => {
    console.log(projectId);
    const response = await api.GetSubmittals(projectId);
    if (response.remote === "success") {
      const { data } = response;
      return { ...data };
    }
    return rejectWithValue(response.error.errors);
  }
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
        (state, { payload }: PayloadAction<any>) => {
          console.log(payload);
        }
      );
  }
});

export default submittalSlice.reducer;

export const { reset, setLoading } = submittalSlice.actions;
