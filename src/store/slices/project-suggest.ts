/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectSuggestResponse, ProjectSuggest } from "models/project-suggest";
import * as api from "services/project-suggest";

type SuggestProject = {
  projectSug: ProjectSuggest;
  loading: boolean;
};

export const initialState: SuggestProject = {
  projectSug: { projectName: "", details: "" },
  loading: false
};

export const getProjectSuggest = createAsyncThunk(
  "project/suggest",
  async () => {
    const response = await api.GetProjectSuggest();
    if (response.remote === "success") {
      const { data } = response;
      return { ...data };
    }
    return response.error.errors;
  }
);

const projectSuggestSlice = createSlice({
  name: "projectSuggestSlice",
  initialState,
  reducers: {
    reset: () => initialState,
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getProjectSuggest.pending, (state: SuggestProject) => {
        state.loading = true;
      })
      .addCase(
        getProjectSuggest.fulfilled,
        (state: any, { payload }: PayloadAction<ProjectSuggestResponse>) => {
          state.projectSug = payload;
        }
      );
  }
});

export default projectSuggestSlice.reducer;

export const { reset, setLoading } = projectSuggestSlice.actions;
