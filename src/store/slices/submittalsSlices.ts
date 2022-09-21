/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Assignee,
  Contractor,
  SubmittalListResponse,
  SubmittalLog
} from "models/submittal-log";
import { DropDownData } from "constants/index";

import * as api from "services/submittals-services";
import { ListWithDictionary } from "models/base";

type SubmittalState = {
  projectId: string;
  list: SubmittalLog[];
  loading: boolean;
  contractors: Contractor[];
  assignees: ListWithDictionary<Assignee>;
};

export const initialState: SubmittalState = {
  projectId: "",
  list: [],
  loading: false,
  contractors: DropDownData.ContractorOptions,
  assignees: {}
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
    updateSubmittal: (state, { payload }: PayloadAction<any>) => {
      state.list = payload;
    },
    updateContractorState: (state, { payload }: PayloadAction<any>) => {
      payload.forEach((element: any) => {
        state.assignees[element.name] = element.assignees;
      });
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
          DropDownData.ContractorOptions.forEach((element: any) => {
            state.assignees[element.name] = element.assignees;
          });
          state.list = payload.response;
        }
      );
  }
});

export default submittalSlice.reducer;

export const { reset, setLoading, updateSubmittal, updateContractorState } =
  submittalSlice.actions;
