import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import miscSlice from "./slices/misc-slice";


//reducer lar burada birlestirilir

export default configureStore({
  reducer: {
    auth: authSlice, // "./slices/auth-slice" dan import edilir
    misc: miscSlice,
  },
});
