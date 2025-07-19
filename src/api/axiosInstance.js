import axios from "axios";
import { store } from "../store/store";
import {login as setLoginState, logout as setLogout} from "../store/features/auth/authSlice";

// --- Configuration ---
const AUTH_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔁 Axios Request Interceptor
axiosInstance.interceptors.request.use(
  async (req) => {
    const {
      auth: { login_data },
    } = store.getState();
    console.log(login_data)
    try {
      if (!login_data?.accessToken) return req;

      const currentTime = Date.now();
      const isExpired = login_data?.exp && currentTime > login_data.exp;

      // ✅ Refresh if expired
      if (isExpired && !req._retry) {
        // console.log("Token expired, refreshing...");
        req._retry = true;

        const response = await axios.post(
          `${AUTH_URL}/auth/refresh-token`,
          { refreshToken: login_data.refreshToken }
        );

        const refreshed = {...login_data};
        refreshed.accessToken = response.data.accessToken;
        refreshed.exp = response.data.exp; // Update expiration time
    
        store.dispatch(setLoginState(refreshed));

        req.headers["Authorization"] = `Bearer ${refreshed.accessToken}`;
        return req;
      }

      // ✅ accessToken is still valid
      // console.log("Using existing token:", login_data.accessToken);
      req.headers["Authorization"] = `Bearer ${login_data.accessToken}`;
      return req;
    } catch (error) {
      console.error("Token refresh failed:", error);
      store.dispatch(setLogout());
      return req; // optionally reject to prevent request
    }
  },
  (error) => Promise.reject(error)
);

export { axiosInstance };
