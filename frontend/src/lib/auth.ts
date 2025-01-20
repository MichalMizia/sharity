import axios from "axios";

export const API_URL = "http://localhost:8080";

interface RegisterI {
  username: string;
  email: string;
  password: string;
}
interface LoginI {
  email: string;
  password: string;
}

export const register = ({ username, email, password }: RegisterI) => {
  return axios.post(`${API_URL}/auth/register`, {
    username,
    email,
    password
  });
};

export const login = ({ email, password }: LoginI) => {
  return axios.post(`${API_URL}/auth/login`, null, {
    params: {
      email,
      password,
    },
    withCredentials: true,
  });
};

export const logout = () => {
  return axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};
