import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";


//reducer lar burada birlestirilir

export default configureStore({
  reducer: {
    auth: authSlice, // "./slices/auth-slice" dan import edilir
  },
});