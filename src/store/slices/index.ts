/* eslint-disable import/no-extraneous-dependencies */
import { AnyAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import homeReducer from "./homeSlice";
import submittalReducer from "./submittalsSlices";
import projectReducer from "./projectSlice";
import projectValueReducer from "./project-value";
import projectSuggestReducer from "./project-suggest";
import stagingZoneReducer from "./staging-zone-slice";
import signIn from "./signIn";

const combinedReducer1 = combineReducers({
  auth: signIn,
  homeState: homeReducer,
  submittals: submittalReducer,
  projects: projectReducer,
  projectValue: projectValueReducer,
  projectSuggest: projectSuggestReducer,
  stagingZone: stagingZoneReducer
});

export type RootState = ReturnType<typeof combinedReducer1>;

export const rootReducer = (state: RootState, action: AnyAction) => {
  return combinedReducer1(state, action);
};
