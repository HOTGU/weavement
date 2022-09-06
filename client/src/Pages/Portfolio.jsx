import React, { useMemo } from "react";
import { useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { getPortfolioSelector } from "../atoms/portfolio";
import Loader from "../Components/Loader";
import { device } from "../device";
import PortfolioCard from "../Components/PortfolioCard";

function Portfolio() {
    const portfolioLoadable = useRecoilValueLoadable(getPortfolioSelector);

    const portfolios = useMemo(() => {
        return portfolioLoadable?.state === "hasValue" ? portfolioLoadable.contents : [];
    }, [portfolioLoadable]);

    return (
        <>
            {portfolioLoadable.state === "loading" ? (
                <Loader isCenter={true} width="40px" height="40px" />
            ) : (
                <div className="default-container">
                    <Container>
                        {portfolios.map((portfolio) => {
                            return (
                                <PortfolioCard
                                    portfolio={portfolio}
                                    key={portfolio._id}
                                />
                            );
                        })}
                    </Container>
                </div>
            )}
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 40px 0;
    gap: 10px;
    @media ${device.tablet} {
        flex-direction: column;
    }
    @media ${device.mobile} {
        margin: 10px 0;
    }
`;

export default Portfolio;
