import { createSlice } from "@reduxjs/toolkit";
import { getUserMenu } from "../../helpers/data/user-menu";


//merkezi state gecici hafizada-ram depolanir, ulasilmasi zordur

//merkezi state hazirlanisi
const initialState = {
  user: null,
  isUserLogin: false,
  userMenu: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { //merkezi state deki degerlerin guncellenmesi
    signIn: (state, action) => {
      state.user = action.payload; //login-form daki user buraya geliyor, action.payload içine
      state.isUserLogin = true;
      state.userMenu = getUserMenu(state.user.role);
      //state.userMenu = getUserMenu(action.payload.role);
    },
    signOut: (state) => {
      state.user = null; //payload a gerek yok, bir şey gönderilmeyecek, null veriliyor
      state.isUserLogin = false; //bu sekilde oldugunda kulanicinin logout oldugu anlamina gelir
      state.userMenu = [];
    },
  },
});

export const { signIn, signOut } = authSlice.actions; //disaridan kullanmak icin export edilir
export default authSlice.reducer;