import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "../helpers/auth-header";

const API_URL = config.api.baseUrl;

export const createMessage = async (payload) => {
  const response = await axios.post(`${API_URL}/contactMessages/save`, payload);
  const data = response.data;
  return data;
};

export const getMessagesByPage = async (
  page = 0,
  size = 20,
  sort = "date",
  type = "desc"
) => {
  const res = await axios.get(
    `${API_URL}/contactMessages/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};
