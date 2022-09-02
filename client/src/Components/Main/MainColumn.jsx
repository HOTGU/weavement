import React from "react";
import styled from "styled-components";

import mainImg from "../../images/weavement-main.jpg";
import mainPhoneImg from "../../images/weavement-main-375w.webp";
import mainTabletImg from "../../images/weavement-main-768w.webp";
import mainDesktopImg from "../../images/weavement-main-1920w.webp";
import { device } from "../../device";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 740px;
        object-fit: cover;
        @media ${device.tablet} {
            height: 600px;
            object-position: right;
        }
        @media ${device.mobile} {
            height: 500px;
            object-position: right;
        }
    }
`;

function MainColumn() {
    return (
        <Wrapper>
            <img
                srcSet={`
                            ${mainPhoneImg} 375w, ${mainTabletImg} 760w, ${mainDesktopImg}
                        `}
                sizes="(max-width: 450px) 375px,
                        (max-width: 780px) 760px,
                        1400px"
                src={mainImg}
                alt="main"
            />
        </Wrapper>
    );
}

export default MainColumn;
