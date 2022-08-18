/* eslint-disable import/no-extraneous-dependencies */
import { AnyAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import homeReducer from "./homeSlice";
import submittalReducer from "./submittalsSlices";
import projectReducer from "./projectSlice";

const combinedReducer1 = combineReducers({
  homeState: homeReducer,
  submittals: submittalReducer,
  projects: projectReducer
});

export type RootState = ReturnType<typeof combinedReducer1>;

export const rootReducer = (state: RootState, action: AnyAction) => {
  return combinedReducer1(state, action);
};
