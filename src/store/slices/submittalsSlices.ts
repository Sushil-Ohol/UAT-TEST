/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubmittalListResponse, SubmittalLog } from "models/submittal-log";

import * as api from "services/submittals-services";
import { RootState } from ".";

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
    dependsOn: [],
    assigned: { assignedTo: "", destination: "" }
  }
};

export const getSubmittalList = createAsyncThunk(
  "submittal/list",
  async (projectId: string, { getState }) => {
    const { submittals, homeState } = getState() as RootState;
    console.log(submittals.list);
    if (submittals.list.length === 0 || homeState.projectId === "") {
      const response = await api.GetSubmittals(projectId);
      // if (response.remote === "success") {
      const { data } = response;
      return { ...data };
    }
    if (submittals.list.length > 0) return submittals.list;
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
          },
    setSubmittalList: (state, { payload }: PayloadAction<SubmittalLog[]>) => {
      state.list = payload;
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
          if (state.list.length === 0) {
            state.list = payload.response;
          }
        }
      );
  }
});

export default submittalSlice.reducer;

export const { reset, setLoading, updateSubmittal, setSubmittalList } =
  submittalSlice.actions;
