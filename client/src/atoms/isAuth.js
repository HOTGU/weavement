import { atom } from "recoil";
import { getCookie } from "../utils/cookie";

export const userAtom = atom({
    key: "user",
    default: getCookie("user") || undefined,
});
