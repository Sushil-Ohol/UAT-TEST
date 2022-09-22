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
  selectedSubmittalLog: SubmittalLog;
};

export const initialState: SubmittalState = {
  projectId: "",
  list: [],
  loading: false,
  contractors: DropDownData.ContractorOptions,
  assignees: {},
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
  async (projectId: string) => {
    // const { submittals, homeState } = getState() as RootState;
    // console.log(submittals.list);
    // if (submittals.list.length === 0 || homeState.projectId === "") {
    const response = await api.GetSubmittals(projectId);
    // if (response.remote === "success") {
    const { data } = response;
    return { ...data };
  }
  // if (submittals.list.length > 0) return submittals.list;
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
      const dataIndex = state.list.findIndex((data) => data.id === payload.id);
      state.list[dataIndex] = payload;
    },
    setSubmittalList: (state, { payload }: PayloadAction<SubmittalLog[]>) => {
      state.list = payload;
    },
    newContractor: (state, { payload }: PayloadAction<any>) => {
      state.contractors.push(payload);
      state.assignees[payload.name] = payload.assignees;
    },
    newAssignee: (state, { payload }: PayloadAction<any>) => {
      const index = state.contractors.findIndex(
        (item) => item.name === payload.contractorName
      );
      if (index > -1) {
        state.contractors[index].assignees?.push(payload.assignee);
      }
      const temp: any = state.assignees[payload.contractorName] || [];
      temp.push(payload.assignee);
      state.assignees[payload.contractorName] = temp;
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
          state.list = payload.response;
          DropDownData.ContractorOptions.forEach((element: any) => {
            state.assignees[element.name] = element.assignees;
          });
        }
      );
  }
});

export default submittalSlice.reducer;

export const {
  reset,
  setLoading,
  setSubmittalList,
  updateSubmittal,
  updateContractorState,
  newContractor,
  newAssignee
} = submittalSlice.actions;
