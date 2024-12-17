import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        {
          params: {
            q: "Peace",
            "api-key": import.meta.env.VITE_NYT_API_KEY,
          },
        }
      );
      return response.data.response.docs;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch news";
      });
  },
});

export default newsSlice.reducer;
