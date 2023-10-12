import { createSlice } from "@reduxjs/toolkit";

const refetchPostsSlice = createSlice({
    name: "refetchPosts",
    initialState: { refetch: false },
    reducers: {
      doRefetch: (state) => {
        state.refetch = true;
      },
      dontRefetch: (state) => {
        state.refetch = false;
      }
    }
  });

export const {doRefetch,dontRefetch}= refetchPostsSlice.actions;
export default refetchPostsSlice.reducer;
export const selectRefetchPostsSlice = (state) => state.refetchPosts.refetch


