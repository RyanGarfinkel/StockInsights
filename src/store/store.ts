import { configureStore } from "@reduxjs/toolkit";
import overviewReducer from "./overviewSlice";
import quoteReducer from "./quoteSlice";
import stockReducer from "./stockslice";


const store = configureStore({
    reducer: {
        overview: overviewReducer,
        quote: quoteReducer,
        stock: stockReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;