/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectListResponse } from "models/project";
import * as api from "services/projects-service";

type ProjectState = {
  list: Project[];
  loading: boolean;
};

export const initialState: ProjectState = {
  list: [],
  loading: false
};

export const getProjectList = createAsyncThunk(
  "project/list",
  async (pageIndex: number, { rejectWithValue }: any) => {
    const response = await api.GetProjects(pageIndex);
    if (response.remote === "success") {
      const { data } = response;
      return { ...data };
    }
    return rejectWithValue(response.error.errors);
  }
);

const projectSlice = createSlice({
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
      .addCase(getProjectList.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProjectList.fulfilled,
        (state, { payload }: PayloadAction<ProjectListResponse>) => {
          state.list = payload.response;
        }
      );
  }
});

export default projectSlice.reducer;

export const { reset, setLoading } = projectSlice.actions;
