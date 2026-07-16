import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("auth/refresh/")   // was "accounts/refresh/"
        ) {
            originalRequest._retry = true;

            try {
                await axiosClient.post("auth/refresh/");     // was "accounts/refresh/"
                return axiosClient(originalRequest);
            } catch (refreshError) {
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;