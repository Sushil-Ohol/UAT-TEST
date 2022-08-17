import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { rootReducer, RootState } from "./slices";

const store = configureStore({
  reducer: rootReducer as any,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      immutableCheck: false
    }),
  devTools: true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState1 = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<any>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
