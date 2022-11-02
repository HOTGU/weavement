import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
    process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "/api";

export const getCSRFToken = async () => {
    const { data } = await axios.get("/getCSRFToken");
    axios.defaults.headers.common["X-CSRF-Token"] = data.csrfToken;
};

// user

export const signinApi = (data) => axios.post(`/user/signin`, data);

export const signupApi = (data) => axios.post(`/user/signup`, data);

export const getApi = () => axios.get(`/user/get`);

export const refreshApi = (token) => axios.post(`/user/refresh`, token);

// contact

export const filterContactApi = (params) =>
    axios.get(`/contact/filter`, {
        params,
    });

export const getContactApi = (params) =>
    axios.get(`/contact`, {
        params,
    });

export const updateContactApi = (id, data) => axios.patch(`/contact/${id}`, data);

export const deleteContactApi = (id) => axios.delete(`/contact/${id}`);

export const createContactApi = (data) => axios.post(`/contact`, data);

// portfolio

export const getTwoPortfolioApi = () => axios.get(`/portfolio/two`);

export const getPortfolioApi = (params) => axios.get(`/portfolio`, { params });

export const allGetPortfoiloApi = () => axios.get(`/portfolio/all`);

export const deletePortfolioApi = (id) => axios.delete(`/portfolio/${id}`);

export const createPortfolioApi = (data) => axios.post(`/portfolio`, data);

// note

export const createNoteApi = (contactId, data) =>
    axios.post(`/contact/note/${contactId}`, data);

export const updateNoteApi = (noteId, data) =>
    axios.patch(`/contact/note/${noteId}`, data);

export const removeNoteApi = (noteId) => axios.delete(`/contact/note/${noteId}`);

export const getNoteApi = (contactId) => axios.get(`/contact/note/${contactId}`);
