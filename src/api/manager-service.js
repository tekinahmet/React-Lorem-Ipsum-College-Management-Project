import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "../helpers/auth-header";

const API_URL = config.api.baseUrl;

export const getManagersByPage = async (
  page = 0,
  size = 20,
  sort = "name",
  type = "asc"
) => {
  const res = await axios.get(
    `${API_URL}/dean/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};

export const deleteManager = async (id) => {
  const res = await axios.delete(`${API_URL}/dean/delete/${id}`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const createManager = async (payload) => {
  const res = await axios.post(`${API_URL}/dean/save`, payload, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const updateManager = async (payload) => {
  const res = await axios.put(`${API_URL}/dean/update/${payload.userId}`, payload, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};
