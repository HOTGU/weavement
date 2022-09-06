import { selector } from "recoil";
import { getPortfolioApi } from "../api";

export const getPortfolioSelector = selector({
    key: "portfolioSelector",
    get: async () => {
        try {
            const { data } = await getPortfolioApi();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
});
