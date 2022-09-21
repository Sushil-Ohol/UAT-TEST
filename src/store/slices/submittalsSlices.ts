/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubmittalListResponse, SubmittalLog } from "models/submittal-log";

import * as api from "services/submittals-services";

type SubmittalState = {
  projectId: string;
  list: SubmittalLog[];
  loading: boolean;
  selectedSubmittalLog: SubmittalLog;
};

export const initialState: SubmittalState = {
  projectId: "",
  list: [],
  loading: false,
  selectedSubmittalLog: {
    id: "",
    submittal: "",
    description: "",
    notification: 0,
    comments: 0,
    revision: 0,
    status: "",
    dueBy: "",
    governingDate: "",
    contractor: { name: "", email: "" },
    dependsOn: "",
    assigned: { assignedTo: "", destination: "" }
  }
};

export const getSubmittalList = createAsyncThunk(
  "submittal/list",
  async (projectId: string) => {
    const response = await api.GetSubmittals(projectId);
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
    },
    updateSubmittal: (state, { payload }: PayloadAction<SubmittalLog>) => {
      console.log(payload);
      const dataIndex = state.list.findIndex((data) => data.id === payload.id);
      state.list[dataIndex] = payload;
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

export const { reset, setLoading, updateSubmittal } = submittalSlice.actions;
