import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./testSlice";

// Single Slice Store
const appStore = configureStore(
    {
        reducer: testSlice
    }
);

export default appStore;