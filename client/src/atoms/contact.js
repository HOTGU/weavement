import { atom, selector } from "recoil";
import { getContactApi } from "../api";

export const filterItemAtom = atom({
    key: "filterItem",
    default: {
        state: "",
        company: "",
        phone: "",
        month: undefined,
    },
});

export const filterInputAtom = atom({
    key: "filterInput",
    default: {
        state: "",
        company: "",
        phone: "",
        month: undefined,
    },
});

export const contactSelectorTrigger = atom({
    key: "triggerAtom",
    default: 0,
});

export const contactListSelector = selector({
    key: "contactsListSelector",
    get: async ({ get }) => {
        get(contactSelectorTrigger);
        const filterParams = get(filterItemAtom);
        const res = await getContactApi(filterParams);
        return res.data;
    },
    set: ({ set }) => {
        set(contactSelectorTrigger, Math.random());
    },
});
