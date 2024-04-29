import { getLocalStorage } from "./encrypted-storage";

 export const getAuthHeader = () => { 
   const token = getLocalStorage("token");
  //const token = localStorage.getItem('token');
    let header = {};
    if (token) {
        header={
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }
    return header;
 }