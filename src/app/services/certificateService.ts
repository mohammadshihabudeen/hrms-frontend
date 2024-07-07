import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/certificates";

export const getCertificates = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCertificate = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCertificate = async (certificate: any) => {
  const response = await axios.post(API_URL, certificate);
  return response.data;
};

export const updateCertificate = async (id: number, certificate: any) => {
  const response = await axios.put(`${API_URL}/${id}`, certificate);
  return response.data;
};

export const deleteCertificate = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
