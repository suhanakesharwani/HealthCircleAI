
import axiosClient from "./axiosClient";

export const register = async (userData) => {
    const response = await axiosClient.post(
        "auth/register/",
        userData
    );

    return response.data;
};

export const login = async (userData) => {
    const response = await axiosClient.post(
        "auth/login/",
        userData
    );

    return response.data;
};

export const logout = async () => {
    const response = await axiosClient.post(
        "auth/logout/"
    );

    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axiosClient.get(
        "auth/me/"
    );

    return response.data;
};