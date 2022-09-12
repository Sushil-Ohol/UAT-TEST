/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "models/discussion";
import * as api from "services/staging-zone-service";

type StagingZoneState = {
  list: Conversation[];
};

export const initialState: StagingZoneState = {
  list: []
};

export const GetDiscussions = createAsyncThunk("discussion/list", async () => {
  const response = await api.GetDiscussions();
  const { data } = response;
  return { ...data };
});
export const GetDiscussionDetails = createAsyncThunk(
  "discussion/details",
  async () => {
    const response = await api.GetDiscussionDetails();
    const { data } = response;
    return { ...data };
  }
);

const stagingZoneSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(
      GetDiscussions.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.list = payload.response;
      }
    );
  }
});

export default stagingZoneSlice.reducer;

export const { reset } = stagingZoneSlice.actions;
