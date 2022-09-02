import { selector } from "recoil";
import { getPortfolioApi } from "../api";

export const getPortfolioSelector = selector({
    key: "portfolioSelector",
    get: async () => {
        const res = await getPortfolioApi();
        return res.data;
    },
});
