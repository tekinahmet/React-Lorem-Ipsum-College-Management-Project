import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "../helpers/auth-header";

const API_URL = config.api.baseUrl;

export const getStudentInfoByPageForTeacher = async (
  page = 0,
  size = 20,
  sort = "educationTermId",
  type = "desc"
) => {
  const res = await axios.get(
    `${API_URL}/studentInfo/getAllForTeacher?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};

export const getStudentInfoByPageForStudent = async (
  page = 0,
  size = 20,
  sort = "educationTermId",
  type = "desc"
) => {
  const res = await axios.get(
    `${API_URL}/studentInfo/getAllByStudent?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};

export const createStudentInfo = async (payload) => {
  const res = await axios.post(`${API_URL}/studentInfo/save`, payload, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const deleteStudentInfo = async (id) => {
  const res = await axios.delete(`${API_URL}/studentInfo/delete/${id}`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const updateStudentInfo = async (payload) => {
  const res = await axios.put(
    `${API_URL}/studentInfo/update/${payload.id}`,
    payload,
    {
      headers: getAuthHeader(),
    }
  ); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};
