import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch and update views
export const fetchAndUpdateViews = createAsyncThunk(
  "views/fetchAndUpdateViews",
  async (slug : string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/post/update-view-count/${slug}`,
      {}
    );

    return response.data.post.views;
  }
);

// Initial state
const initialState = { views: null };

// Create the slice
const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAndUpdateViews.fulfilled, (state, action) => {
      state.views = action.payload;
    });
  },
});

export default viewsSlice.reducer;
