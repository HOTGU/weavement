import { removeCookie } from "./cookie";

const logout = () => {
    removeCookie("accessToken");
    removeCookie("user");
    removeCookie("refreshToken");
    window.location.href = "/auth";
    window.alert(`권한이 없습니다\n문의주세요`);
};

export default logout;
