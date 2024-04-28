import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "../helpers/auth-header";

const API_URL = config.api.baseUrl;

export const getTeachersByPage = async (
  page = 0,
  size = 20,
  sort = "name",
  type = "asc"
) => {
  const res = await axios.get(
    `${API_URL}/teachers/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};

export const createTeacher = async (payload) => {
  const res = await axios.post(`${API_URL}/teachers/save`, payload, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const deleteTeacher = async (id) => {
  const res = await axios.delete(`${API_URL}/teachers/delete/${id}`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const updateTeacher = async (payload) => {
  const res = await axios.put(
    `${API_URL}/teachers/update/${payload.userId}`,
    payload,
    {
      headers: getAuthHeader(),
    }
  ); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};
export const getAllTeachers = async () => {
  const res = await axios.get(`${API_URL}/teachers/getAll`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};
export const getTeacherById = async (id) => {
  const res = await axios.get(`${API_URL}/teachers/getSavedTeacherById/${id}`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const assignTeacherToProgram = async (payload) => {
  const res = await axios.post(`${API_URL}/teachers/chooseLesson`, payload, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};
