import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "../helpers/auth-header";
const API_URL = config.api.baseUrl;

export const getLessonsByPage = async (
  page = 0,
  size = 20,
  sort = "lessonName",
  type = "asc"
) => {
  const res = await axios.get(
    `${API_URL}/lessons/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};
export const getAllLessons = async () => {
  const res = await axios.get(`${API_URL}/lessons/getAll`, {
    headers: getAuthHeader(),
  });
  const data = res.data;
  return data;
};

export const createLesson = async (payload) => {
  const res = await axios.post(`${API_URL}/lessons/save`, payload, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const deleteLesson = async (id) => {
  const res = await axios.delete(`${API_URL}/lessons/delete/${id}`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};
