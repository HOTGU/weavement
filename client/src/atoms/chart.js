import { atom, selector } from "recoil";
import { filterContactApi } from "../api";

export const filterYearAtom = atom({
    key: "filterYear",
    default: { year: 2022 },
});

export const chartSelectorTrigger = atom({
    key: "chartSelectorTriggerAtom",
    default: 0,
});

export const contactChartSelector = selector({
    key: "contactChartSelector",
    get: async ({ get }) => {
        get(chartSelectorTrigger);
        const filterParams = get(filterYearAtom);
        const res = await filterContactApi(filterParams);
        return res.data;
    },
    set: ({ set }) => {
        set(chartSelectorTrigger, Math.random());
    },
});
