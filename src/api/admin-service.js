import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "../helpers/auth-header";

const API_URL = config.api.baseUrl;

export const getAdminsByPage = async (
  page = 0,
  size = 20,
  sort = "name",
  type = "asc"
) => {
  const res = await axios.get(
    `${API_URL}/admin/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};
export const deleteAdmin = async (id) => {
  const res = await axios.delete(`${API_URL}/admin/delete/${id}`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};


export const createAdmin = async (payload) => {
  const res = await axios.post(`${API_URL}/admin/save`, payload,{
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};
