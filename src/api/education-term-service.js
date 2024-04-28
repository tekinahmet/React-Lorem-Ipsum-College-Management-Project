import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "../helpers/auth-header";

const API_URL = config.api.baseUrl;

export const getEducationTermsByPage = async (
  page = 0,
  size = 20,
  sort = "startDate",
  type = "asc"
) => {
  const res = await axios.get(
    `${API_URL}/educationTerms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};

export const getAllEducationTerms = async () => {
  const res = await axios.get(
    `${API_URL}/educationTerms/getAll`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};
export const createEducationTerm = async (payload) => {
  const res = await axios.post(`${API_URL}/educationTerms`, payload, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const deleteEducationTerm = async (id) => {
  const res = await axios.delete(`${API_URL}/educationTerms/${id}`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};
