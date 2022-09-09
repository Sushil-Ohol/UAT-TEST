/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectValueResponse, Project } from "models/project-value";
import * as api from "services/projects-service";

type ProjectValue = {
  projectValue: Project;
  loading: boolean;
};

export const initialState: ProjectValue = {
  projectValue: { floors: 0, materials: 0, submittals: 0 },
  loading: false
};

export const getProjectValue = createAsyncThunk("project/value", async () => {
  const response = await api.GetProjectValue();
  // if (response.remote === "success") {
  const { data } = response;
  return { ...data };
  // }
  // return response.error.errors;
});

const projectValueSlice = createSlice({
  name: "projectValueSlice",
  initialState,
  reducers: {
    reset: () => initialState,
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getProjectValue.pending, (state: ProjectValue) => {
        state.loading = true;
      })
      .addCase(
        getProjectValue.fulfilled,
        (state: any, { payload }: PayloadAction<ProjectValueResponse>) => {
          state.projectValue = payload;
        }
      );
  }
});

export default projectValueSlice.reducer;

export const { reset, setLoading } = projectValueSlice.actions;
