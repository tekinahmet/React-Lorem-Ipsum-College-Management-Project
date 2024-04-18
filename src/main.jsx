import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.scss'
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import { PrimeReactProvider } from 'primereact/api';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <StoreProvider store = {store}> 
  <PrimeReactProvider>
   <App />
   </PrimeReactProvider>
  </StoreProvider>
  
  </React.StrictMode>,
)
//main,jsx app.jsx ten önce render olur, o yüzden storeprovider ı buraya aldık