// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("clinic_token");

//   console.log("Token:", token);

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   console.log(config.headers);

//   return config;
// });
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("clinic_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle 401 — refresh tokens automatically
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refreshToken = localStorage.getItem("clinic_refresh_token");

        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const { data } = await axios.post(
          "http://localhost:5000/api/v1/auth/refresh",
          {
            refreshToken,
          }
        );

        const accessToken = data.data.tokens.accessToken;
        const newRefreshToken = data.data.tokens.refreshToken;

        localStorage.setItem("clinic_token", accessToken);
        localStorage.setItem("clinic_refresh_token", newRefreshToken);

        original.headers.Authorization = `Bearer ${accessToken}`;

        return api(original);
      } catch (refreshError) {
        localStorage.removeItem("clinic_token");
        localStorage.removeItem("clinic_refresh_token");

        document.cookie = "clinic_token=; path=/; max-age=0";

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
