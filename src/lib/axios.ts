import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "./authStorage";

const API_URL = "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ── Token refresh ────────────────────────────────────────────────

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

// A 401 from these endpoints means "bad credentials", not "expired token".
const NO_REFRESH_PATHS = ["/auth/login", "/auth/refresh"];

// Backend message for a wrong current password (also a 401).
const WRONG_PASSWORD_MESSAGE = "Current password is incorrect";

// If several requests fail with 401 at the same time, they all share ONE refresh call.
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  // Plain axios (not `api`) so this call never goes through the interceptors.
  const { data } = await axios.post(`${API_URL}/auth/refresh`, {
    refreshToken,
  });

  // Backend response: { success, message, data: { accessToken, refreshToken } }
  const { accessToken, refreshToken: newRefreshToken } = data.data;

  saveTokens({ accessToken, refreshToken: newRefreshToken });

  return accessToken;
}

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<{ message?: string }>) => {
    const original = error.config as RetryableConfig | undefined;

    const isUnauthorized = error.response?.status === 401;
    const isAuthEndpoint = NO_REFRESH_PATHS.some((path) =>
      original?.url?.includes(path)
    );
    const isWrongPassword =
      error.response?.data?.message === WRONG_PASSWORD_MESSAGE;

    if (
      !isUnauthorized ||
      !original ||
      original._retry ||
      isAuthEndpoint ||
      isWrongPassword
    ) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      const accessToken = await refreshPromise;

      original.headers.Authorization = `Bearer ${accessToken}`;

      return api(original);
    } catch (refreshError) {
      clearSession();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      return Promise.reject(refreshError);
    }
  }
);

export default api;
