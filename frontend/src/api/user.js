import axiosClient from "./axiosClient";

export const getCurrentUser = async () => {
    const response = await axiosClient.get("auth/me/");
    return response.data;
};