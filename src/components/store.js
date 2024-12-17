import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/newsSlice";
import compareReducer from "./slices/compareSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
    compare: compareReducer,
  },
});

export default store;
