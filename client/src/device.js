const size = {
    mobile: "450px",
    tablet: "770px",
    laptop: "1025px",
    laptopL: "1440px",
    desktop: "1980px",
};

export const device = {
    mobile: `only screen and  (max-width : ${size.mobile})`,
    tablet: `only screen and  (max-width : ${size.tablet})`,
    laptop: `only screen and  (max-width : ${size.laptop})`,
    laptopL: `only screen and (max-width) : ${size.laptopL} `,
    desktop: `only screen and  (max-width : ${size.desktop})`,
};
