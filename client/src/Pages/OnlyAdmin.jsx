import { Navigate, Outlet } from "react-router-dom";
import { removeCookie } from "../utils/cookie";

function OnlyAdmin({ isAllowed, children }) {
    if (!isAllowed) {
        removeCookie("user");
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
}

export default OnlyAdmin;
