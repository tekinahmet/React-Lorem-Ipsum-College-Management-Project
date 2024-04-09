import axios from "axios";
import { config } from "../helpers/config";

const API_URL = config.api.baseUrl;

export const login = async (payload) => {
  const response = await axios.post(`${API_URL}/auth/login`, payload);
  const data = response.data;
  return data;
};

//payload = {username, password}
