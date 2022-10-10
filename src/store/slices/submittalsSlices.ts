/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Assignee,
  Company,
  SubmittalListResponse,
  SubmittalLog
} from "models/submittal-log";
import { DropDownData } from "constants/index";

import * as api from "services/submittals-services";
import { ListWithDictionary } from "models/base";
import { ConversationDoc } from "models/discussion";

type SubmittalState = {
  projectId: string;
  list: SubmittalLog[];
  loading: boolean;
  companies: Company[];
  assignees: ListWithDictionary<Assignee>;
  selectedSubmittalLog: SubmittalLog;
};

export const initialState: SubmittalState = {
  projectId: "",
  list: [],
  loading: false,
  companies: DropDownData.CompanyOptions,
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
    company: { name: "", email: "" },
    dependsOn: [],
    assigned: { assignedTo: "", destination: "" },
    docs: []
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
    updateDocs: (
      state,
      {
        payload
      }: PayloadAction<{ submittalId: string; docs: ConversationDoc[] }>
    ) => {
      const dataIndex = state.list.findIndex(
        (data) => data.id === payload.submittalId
      );
      state.list[dataIndex].revision =
        payload.docs.length > 0 ? payload.docs.length : null;
      state.list[dataIndex].docs = payload.docs;
    },
    updateField: <K extends keyof SubmittalLog>(
      state: SubmittalState,
      {
        payload
      }: PayloadAction<{
        submittalId: string;
        field: K;
        value: SubmittalLog[K];
      }>
    ) => {
      const dataIndex = state.list.findIndex(
        (data) => data.id === payload.submittalId
      );
      state.list[dataIndex][payload.field] = payload.value;
    },
    setSubmittalList: (state, { payload }: PayloadAction<SubmittalLog[]>) => {
      state.list = payload;
    },
    newCompany: (state, { payload }: PayloadAction<any>) => {
      state.companies.push(payload);
      state.assignees[payload.name] = payload.assignees;
    },
    newAssignee: (state, { payload }: PayloadAction<any>) => {
      const index = state.companies.findIndex(
        (item) => item.name === payload.companyName
      );
      if (index > -1) {
        state.companies[index].assignees?.push(payload.assignee);
      }
      const temp: any = state.assignees[payload.companyName] || [];
      temp.push(payload.assignee);
      state.assignees[payload.companyName] = temp;
    },
    updatecompaniestate: (state, { payload }: PayloadAction<any>) => {
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
          DropDownData.CompanyOptions.forEach((element: any) => {
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
  updatecompaniestate,
  newCompany,
  newAssignee,
  updateDocs,
  updateField
} = submittalSlice.actions;
