import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "../helpers/auth-header";
const API_URL = config.api.baseUrl;

export const getLessonProgramsByPage = async (
  page = 0,
  size = 20,
  sort = "day",
  type = "asc"
) => {
  const res = await axios.get(
    `${API_URL}/lessonPrograms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};

export const createLessonProgram = async (payload) => {
  const res = await axios.post(`${API_URL}/lessonPrograms/save`, payload, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const deleteLessonProgram = async (id) => {
  const res = await axios.delete(`${API_URL}/lessonPrograms/delete/${id}`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const getUnassignedLessonPrograms = async () => {
  const res = await axios.get(`${API_URL}/lessonPrograms/getAllUnassigned/`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const getAllLessonPrograms = async () => {
  const res = await axios.get(`${API_URL}/lessonPrograms/getAll/`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const getAllLessonProgramByStudent = async () => {
  const res = await axios.get(`${API_URL}/lessonPrograms/getAllLessonProgramByStudent/`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

