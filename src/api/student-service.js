import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "../helpers/auth-header";

const API_URL = config.api.baseUrl;

export const getStudentsByPage = async (
  page = 0,
  size = 20,
  sort = "name",
  type = "asc"
) => {
  const res = await axios.get(
    `${API_URL}/students/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};

export const getAllStudentsForAdvisor = async () => {
  const res = await axios.get(`${API_URL}/students/getAllByAdvisor`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};


export const createStudent = async (payload) => {
  const res = await axios.post(`${API_URL}/students/save`, payload, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const deleteStudent = async (studentId) => {
  const res = await axios.delete(`${API_URL}/students/delete/${studentId}`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const updateStudent = async (payload) => {
  const res = await axios.put(
    `${API_URL}/students/update/${payload.id}`,
    payload,
    {
      headers: getAuthHeader(),
    }
  ); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const chooseLesson = async (payload) => {
  const res = await axios.post(
    `${API_URL}/students/chooseLesson`,
    payload,
    {
      headers: getAuthHeader(),
    }
  ); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};
