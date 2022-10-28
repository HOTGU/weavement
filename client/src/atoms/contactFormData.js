import { atom } from "recoil";

export const contactFormData = atom({
    key: "contactFormDataAtom",
    default: {},
});

export const contactFileData = atom({
    key: "contactFileDataAtom",
    default: [],
});
