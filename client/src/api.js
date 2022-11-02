import axios from "axios";
import jwt_decode from "jwt-decode";
import { getCookie, setCookie } from "./utils/cookie";
import logout from "./utils/logout";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
    process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "/api";

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
                httpOnly: process.env.NODE_ENV === "production" ? true : false,
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
                httpOnly: process.env.NODE_ENV === "production" ? true : false,
            });
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosJWT.interceptors.response.use(
    function (response) {
        return response;
    },
    async (error) => {
        const {
            response: { status },
        } = error;
        if (status === 401) {
            logout();
        }
        return Promise.reject(error);
    }
);

export const getCSRFToken = async () => {
    const { data } = await axios.get("/getCSRFToken");
    axios.defaults.headers.common["X-CSRF-Token"] = data.csrfToken;
    axiosJWT.defaults.headers.common["X-CSRF-Token"] = data.csrfToken;
};

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

// portfolio

export const getTwoPortfolioApi = () => axios.get(`/portfolio/two`);

export const getPortfolioApi = (params) => axios.get(`/portfolio`, { params });

export const allGetPortfoiloApi = () => axiosJWT.get(`/portfolio/all`);

export const deletePortfolioApi = (id) => axiosJWT.delete(`/portfolio/${id}`);

export const createPortfolioApi = (data) => axiosJWT.post(`/portfolio`, data);

// note

export const createNoteApi = (contactId, data) =>
    axiosJWT.post(`/contact/note/${contactId}`, data);

export const updateNoteApi = (noteId, data) =>
    axiosJWT.patch(`/contact/note/${noteId}`, data);

export const removeNoteApi = (noteId) => axiosJWT.delete(`/contact/note/${noteId}`);

export const getNoteApi = (contactId) => axiosJWT.get(`/contact/note/${contactId}`);
