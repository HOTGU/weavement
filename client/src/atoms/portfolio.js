import { selector, atom } from "recoil";
import { allGetPortfoiloApi, getPortfolioApi, getTwoPortfolioApi } from "../api";

export const portfoliosPage = atom({
    key: "portfoliosCurrentPage",
    default: 1,
});

export const getPortfolioSelector = selector({
    key: "portfolioGetSelector",
    get: async ({ get }) => {
        try {
            const currentPage = get(portfoliosPage);
            const { data } = await getPortfolioApi({ page: currentPage });
            return { ...data };
        } catch (error) {
            console.log(error);
        }
    },
});

export const portfolioSelectorTrigger = atom({
    key: "portfolioTriggerAtom",
    default: 0,
});

export const allGetPortfolioSelector = selector({
    key: "portfolioAllGetSelector",
    get: async ({ get }) => {
        try {
            get(portfolioSelectorTrigger);
            const { data } = await allGetPortfoiloApi();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    set: ({ set }) => {
        set(portfolioSelectorTrigger, Math.random());
    },
});

export const getTwoPortfolioSelector = selector({
    key: "getTwoPortfolioSelector",
    get: async () => {
        try {
            const { data } = await getTwoPortfolioApi();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
});
