import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { getTwoPortfolioSelector } from "../../atoms/portfolio";
import PortfolioCard from "../PortfolioCard";
import { device } from "../../device";

function PortfolioColumn() {
    const portfolioLoadble = useRecoilValueLoadable(getTwoPortfolioSelector);

    const portfolios = useMemo(() => {
        return portfolioLoadble.state === "hasValue" ? portfolioLoadble.contents : [];
    }, [portfolioLoadble]);

    return (
        <Container className="column">
            <div className="default-container">
                <div className="row-flex">
                    <div className="column__head head__margin">Portfolio</div>
                    <Link to="/portfolio" className="head__margin">
                        <FontAwesomeIcon icon={faChevronRight} size="2x" />
                    </Link>
                </div>
                <div className="row-flex">
                    {portfolios.map((portfolio) => {
                        return <PortfolioCard portfolio={portfolio} />;
                    })}
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    background-color: ${(props) => props.theme.textColor};
    color: white;
    .row-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        @media ${device.mobile} {
            svg {
                font-size: 16px;
            }
        }
        &:last-child {
            @media ${device.mobile} {
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
            }
        }
    }
`;

export default PortfolioColumn;
