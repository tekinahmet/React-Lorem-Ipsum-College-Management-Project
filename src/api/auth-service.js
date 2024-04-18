

import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "../helpers/auth-header";

const API_URL = config.api.baseUrl;
export const login = async (payload) => {
  const response = await axios.post(`${API_URL}/auth/login`, payload);
  const data = response.data;
  return data;
};
export const getMe = async () => {
  const response = await axios.get(`${API_URL}/user/me`, {
    headers: getAuthHeader()
  });
  const data = response.data;
  return data;
};
