import { selector, atom } from "recoil";
import { getPortfolioApi } from "../api";

export const portfoliosPage = atom({
    key: "portfoliosCurrentPage",
    default: 1,
});

export const getPortfolioSelector = selector({
    key: "portfolioSelector",
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
