import { selector } from "recoil";
import { getPortfolioApi } from "../api";

export const getPortfolioSelector = selector({
    key: "portfolioSelector",
    get: async ({ get }) => {
        const res = await getPortfolioApi();
        console.log(res);
        return res.data;
    },
});
