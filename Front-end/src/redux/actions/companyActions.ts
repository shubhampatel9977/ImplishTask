import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

interface Company {
  code: number;
  name: string;
  machines: number;
  area: string;
  link: string;
  frequency: number;
  c_number: string;
  remark: string;
}

export const getAllCompany = async (): Promise<Company[]> => {
  const token: any = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': JSON.parse(token),
      'Content-Type': 'application/json',
    }
  };
  const response = await axios.get<Company[]>(`${BASE_URL}/company`, config);
  return response.data;
};

export const addCompany = async (payload: Company): Promise<Company> => {
  const token: any = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': JSON.parse(token),
      'Content-Type': 'application/json',
    }
  };
  const response = await axios.post<Company>(`${BASE_URL}/company`, payload, config);
  return response.data;
};

export const updateCompanyById = async (code: number, updatedCompany: Company): Promise<Company> => {
  const token: any = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': JSON.parse(token),
      'Content-Type': 'application/json',
    }
  };
  const response = await axios.put<Company>(`${BASE_URL}/company/${code}`, updatedCompany, config);
  return response.data;
};

export const deleteCompanyById = async (code: number): Promise<number> => {
  const token: any = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': JSON.parse(token),
      'Content-Type': 'application/json',
    }
  };
  await axios.delete(`${BASE_URL}/company/${code}`, config);
  return code;
};