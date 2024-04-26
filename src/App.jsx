import React, { useEffect, useState } from "react";
import AppRouter from "./router";
import { useDispatch } from "react-redux";

import { getMe } from "./api/auth-service";
import { signIn, signOut } from "./store/slices/auth-slice";
import LoadingSpinner from "./components/common/loading-spinner";
// import { removeLocalStorage, getLocalStorage } from "./helpers/encrypted-storage";

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch(); //merkezi state de degisiklik yapmak istiyorsak useDispatch hook kullaniyoruz, dispatch reducer i calistirir
  const loadData = async () => {
    try {
      // const token = getLocalStorage("token");
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const user = await getMe();
      dispatch(signIn(user));
    } catch (err) {
      console.log(err);
      dispatch(signOut());
      // removeLocalStorage("token");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return <AppRouter />;
};

export default App;
