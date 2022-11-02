import { removeCookie } from "./cookie";

const logout = () => {
    removeCookie("accessToken");
    removeCookie("user");
    removeCookie("refreshToken");
};

export default logout;
