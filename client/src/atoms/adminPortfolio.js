import { atom } from "recoil";

export const totalColumnAtom = atom({
    key: "totalColumn",
    default: 3,
});

export const pageColumnAtom = atom({
    key: "pageColumn",
    default: {
        1: [1],
        2: [1],
        3: [1],
    },
});

export const thumbImageWhereAtom = atom({
    key: "thumbImageWhere",
    default: "1-1",
});

export const pageImagesAtom = atom({
    key: "pageImages",
    default: [],
});
