import { configureStore } from "@reduxjs/toolkit";
// ...
import userReducer from "../actions/userSlice.js";
import themeReducer from "../actions/themeSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
