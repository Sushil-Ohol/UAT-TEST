/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Discussion } from "models/discussion";
import * as api from "services/staging-zone-service";

type StagingZoneState = {
  discussionList: Discussion[];
  selectedDiscussion: Discussion | null;
};

export const initialState: StagingZoneState = {
  discussionList: [],
  selectedDiscussion: null
};

export const GetDiscussions = createAsyncThunk("discussion/list", async () => {
  const response = await api.GetDiscussions();
  const { data } = response;
  return { ...data };
});
export const GetDiscussionDetails = createAsyncThunk(
  "discussion/details",
  async (topicId: string) => {
    const response = await api.GetDiscussionDetails(topicId);
    const { data } = response;
    return { ...data };
  }
);

const stagingZoneSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {
    reset: () => initialState,
    newMessage: (state, { payload }: PayloadAction<any>) => {
      const { chatInfo } = payload;
      if (state.selectedDiscussion !== null) {
        state.selectedDiscussion.chats?.push(chatInfo);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        GetDiscussions.fulfilled,
        (state, { payload }: PayloadAction<any>) => {
          state.discussionList = payload.response;
        }
      )
      .addCase(
        GetDiscussionDetails.fulfilled,
        (state, { payload }: PayloadAction<any>) => {
          state.selectedDiscussion = payload.response;
        }
      );
  }
});

export default stagingZoneSlice.reducer;

export const { reset, newMessage } = stagingZoneSlice.actions;
