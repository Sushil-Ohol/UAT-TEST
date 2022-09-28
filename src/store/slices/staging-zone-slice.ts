/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListWithDictionary } from "models/base";
import {
  Discussion,
  Conversation,
  ConversationDoc,
  DiscussionDetailsResponse
} from "models/discussion";
import * as api from "services/staging-zone-service";
import { RootState } from "./index";

type StagingZoneState = {
  discussionList: Discussion[];
  selectedDiscussion: Discussion | null;
  discussions: ListWithDictionary<Conversation>;
  documents: ListWithDictionary<ConversationDoc>;
};

export const initialState: StagingZoneState = {
  discussionList: [],
  selectedDiscussion: null,
  discussions: {},
  documents: {}
};

export const GetDiscussions = createAsyncThunk("discussion/list", async () => {
  const response = await api.GetDiscussions();
  const { data } = response;
  return { ...data };
});

export const GetDiscussionDetails = createAsyncThunk(
  "discussion/details",
  async (topicId: string, { getState }) => {
    const response = await api.GetDiscussionDetails(topicId);
    const { stagingZone } = getState() as RootState;
    if (response.status === 204) {
      const newTopic = stagingZone.discussionList.find((item) => item.topicId);
      const newTopicObj: Discussion = {
        topicId,
        topicName: newTopic ? newTopic.topicName : "",
        chats: [],
        docs: [],
        unreadCount: 0,
        documentCount: 0
      };
      return { response: newTopicObj };
    }
    const { data } = response;
    return { ...data };
  }
);

const stagingZoneSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {
    reset: () => initialState,
    addNewDiscussion: (state: any, { payload }: any) => {
      state.discussionList = [payload, ...state.discussionList];
    },
    newMessage: (state, { payload }: PayloadAction<any>) => {
      const { discussionId, chatInfo } = payload;
      if (state.selectedDiscussion !== null) {
        state.selectedDiscussion.chats?.push(chatInfo);
      }
      state.discussions[discussionId].list.push(chatInfo);
    },
    newDocument: (state, { payload }: PayloadAction<any>) => {
      state.documents[payload.discussionId].list = [
        ...state.documents[payload.discussionId].list,
        payload.newFile
      ];
    },
    deleteDocument: (state, { payload }: PayloadAction<any>) => {
      state.documents[payload.discussionId].list = state.documents[
        payload.discussionId
      ].list.filter((item) => item.fileName !== payload.fileName);
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
        (state, { payload }: PayloadAction<DiscussionDetailsResponse>) => {
          state.selectedDiscussion = payload.response;
          if (!state.discussions[payload.response.topicId]) {
            state.discussions[payload.response.topicId] = {
              list: payload.response.chats ? payload.response.chats : []
            };
          }
          if (!state.documents[payload.response.topicId]) {
            state.documents[payload.response.topicId] = {
              list: payload.response.docs ? payload.response.docs : []
            };
          }
        }
      );
  }
});

export default stagingZoneSlice.reducer;

export const {
  reset,
  newMessage,
  addNewDiscussion,
  newDocument,
  deleteDocument
} = stagingZoneSlice.actions;
