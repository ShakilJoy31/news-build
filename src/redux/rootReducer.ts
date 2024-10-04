import { baseApi } from "./api/baseApi";
import viewsReducer from "./features/viewsSlice";

export const reducer = {
  views: viewsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
