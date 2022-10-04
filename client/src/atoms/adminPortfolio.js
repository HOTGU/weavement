import { atom } from "recoil";

export const columnAtom = atom({
    key: "columnsPortfolioPreview",
    default: [],
});

export const imageFilesAtom = atom({
    key: "imageFilesAtom",
    default: [],
});

export const textsAtom = atom({
    key: "textsAtom",
    default: [],
});
