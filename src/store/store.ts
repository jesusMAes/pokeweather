import { configureStore } from "@reduxjs/toolkit";
import citySliceReducer from "./citySlice";

/**Store de redux toolkit para almacenar el estado */
export const store = configureStore({
  reducer:{
    city: citySliceReducer
  }
})

//necesario para que typescript entienda el store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch