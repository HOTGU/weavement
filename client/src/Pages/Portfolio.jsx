import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

import { getPortfolioSelector, portfoliosPage } from "../atoms/portfolio";
import Loader from "../Components/Loader";
import { device } from "../device";
import PortfolioCard from "../Components/PortfolioCard";
import Metatag from "../Components/Metatag";

function Portfolio() {
    const portfolioLoadable = useRecoilValueLoadable(getPortfolioSelector);
    const [currentPage, setCurrentPage] = useRecoilState(portfoliosPage);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const { totalPages, portfolios } = useMemo(() => {
        return portfolioLoadable?.state === "hasValue"
            ? portfolioLoadable.contents
            : { portfolios: [], totalPages: 1 };
    }, [portfolioLoadable]);

    const pages = new Array(totalPages).fill(null).map((__, index) => index + 1);

    return (
        <>
            <Metatag title="위브먼트 | 포트폴리오" />
            <div className="default-container">
                {portfolioLoadable.state === "loading" ? (
                    <Loader isCenter={true} width="40px" height="40px" />
                ) : (
                    <>
                        {portfolios.length > 0 && (
                            <>
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
                                <PageContainer>
                                    {currentPage !== 1 && (
                                        <PageBtn
                                            onClick={() =>
                                                setCurrentPage((prev) => prev - 1)
                                            }
                                            className="pageBtn"
                                        >
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </PageBtn>
                                    )}
                                    {pages.map((page) => (
                                        <Page page={page} key={page} />
                                    ))}
                                    {currentPage !== totalPages && (
                                        <PageBtn
                                            onClick={() =>
                                                setCurrentPage((prev) => prev + 1)
                                            }
                                            className="pageBtn"
                                        >
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </PageBtn>
                                    )}
                                </PageContainer>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    gap: 10px;
    @media ${device.tablet} {
        flex-direction: column;
    }
    @media ${device.mobile} {
        margin: 10px 0;
        gap: 5px;
    }
`;

const PageContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 40px 0;
`;

const Page = ({ page }) => {
    const [currentPage, setCurrentPage] = useRecoilState(portfoliosPage);
    const PAGE_LIST = 5;

    return (
        <>
            {Math.ceil(currentPage / PAGE_LIST) === Math.ceil(page / PAGE_LIST) && (
                <PageBtn
                    className="pageBtn"
                    onClick={() => setCurrentPage(page)}
                    isActive={page === currentPage}
                >
                    {page}
                </PageBtn>
            )}
        </>
    );
};

const PageBtn = styled.div`
    padding: 8px 16px;
    color: ${(props) => (props.isActive ? props.theme.white : props.theme.color)};
    background-color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.bgColor};
    font-weight: 700;
    cursor: pointer;
`;

export default Portfolio;
