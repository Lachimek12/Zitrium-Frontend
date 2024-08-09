/* Libraries */
import axios, { InternalAxiosRequestConfig } from "axios";

/* App modules imports */
import { LOCAL_STORAGE_PROFILE_KEY, SERVER_ADDRESS } from "@utils/constants";

function authInterceptor(req: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const profile = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
  const accessToken = profile ? JSON.parse(profile)?.accessToken : null;
  console.log(accessToken);
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
}

const API = axios.create({
  baseURL: SERVER_ADDRESS,
});

API.interceptors.request.use(authInterceptor);

export default API;
