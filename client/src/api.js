import axios from "axios";
import jwt_decode from "jwt-decode";
import { getCookie, setCookie } from "./utils/cookie";

axios.defaults.baseURL = "http://localhost:5000/api";
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const axiosJWT = axios.create({
    withCredentials: true,
});

axiosJWT.interceptors.request.use(
    async (config) => {
        let currentDate = new Date();

        const accessToken = getCookie("accessToken");
        const refreshToken = getCookie("refreshToken");

        if (!accessToken && refreshToken) {
            const res = await refreshApi({ refreshToken });
            setCookie("accessToken", res.data.accessToken, {
                path: "/",
            });
            const refreshDate = new Date();
            refreshDate.setTime(refreshDate.getTime() + 1000 * 60 * 60 * 24 * 14); //14일
            setCookie("refreshToken", res.data.refreshToken, {
                path: "/",
                expires: refreshDate,
                secure: true,
                httpOnly: false,
            });
            return config;
        }

        const decodedToken = jwt_decode(accessToken);

        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const res = await refreshApi({ refreshToken });
            setCookie("accessToken", res.data.accessToken, {
                path: "/",
            });
            const refreshDate = new Date();
            refreshDate.setTime(refreshDate.getTime() + 1000 * 60 * 60 * 24 * 14); //14일
            setCookie("refreshToken", res.data.refreshToken, {
                path: "/",
                expires: refreshDate,
                secure: true,
                httpOnly: false,
            });
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// axiosJWT.interceptors.response.use(
//     function (response) {
//         return response;
//     },
//     async (error) => {
//         const {
//             response: { status },
//         } = error;
//         if (status === 401) {
//             removeCookie("accessToken");
//             removeCookie("user");
//             removeCookie("refreshToken");
//             window.location.href = "/";
//             window.alert(`인증이 만료되었습니다 \n 다시 로그인해주세요`);
//         }
//         return Promise.reject(error);
//     }
// );

// user

export const signinApi = (data) => axios.post(`/user/signin`, data);

export const signupApi = (data) => axios.post(`/user/signup`, data);

export const getApi = () => axiosJWT.get(`/user/get`);

export const refreshApi = (token) => axios.post(`/user/refresh`, token);

// contact

export const filterContactApi = (params) =>
    axiosJWT.get(`/contact/filter`, {
        params,
    });

export const getContactApi = (params) =>
    axiosJWT.get(`/contact`, {
        params,
    });

export const updateContactApi = (id, data) => axiosJWT.patch(`/contact/${id}`, data);

export const deleteContactApi = (id) => axiosJWT.delete(`/contact/${id}`);

export const createContactApi = (data) => axios.post(`/contact`, data);
