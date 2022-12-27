import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
    key: "user",
    storage: sessionStorage,
});
export const userAtom = atom({
    key: "user",
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});
