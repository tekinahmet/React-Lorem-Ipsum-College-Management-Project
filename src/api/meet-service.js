import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "../helpers/auth-header";

const API_URL = config.api.baseUrl;

export const getAllMeetsByPageForAdvisorTeacher = async (
  page = 0,
  size = 20,
) => {
  const res = await axios.get(
    `${API_URL}/meet/getAllMeetByAdvisorAsPage?page=${page}&size=${size}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};
export const getAllMeetsByStudent = async () => {
  const res = await axios.get(
    `${API_URL}/meet/getAllMeetByStudent`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = res.data;
  return data;
};

export const createMeet = async (payload) => {
  const res = await axios.post(`${API_URL}/meet/save`, payload, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const deleteMeet = async (id) => {
  const res = await axios.delete(`${API_URL}/meet/delete/${id}`, {
    headers: getAuthHeader(),
  }); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};

export const updateMeet = async (payload) => {
  const res = await axios.put(
    `${API_URL}/meet/update/${payload.id}`,
    payload,
    {
      headers: getAuthHeader(),
    }
  ); //headers gerekli, yetki kontrolu yapacak
  const data = res.data;
  return data;
};
