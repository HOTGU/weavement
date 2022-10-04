import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useRecoilValueLoadable, useResetRecoilState } from "recoil";
import { toast } from "react-toastify";

import { allGetPortfolioSelector } from "../atoms/portfolio";
import { deletePortfolioApi } from "../api";
import Confirm from "../Components/Confirm";
import Preview from "../Components/Portfolio/Preview";

const PortfolioRow = ({ portfolio, index }) => {
    const [createConfirm, setCreateConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const reload = useResetRecoilState(allGetPortfolioSelector);

    const deletePortfolio = async () => {
        setLoading(true);
        try {
            await deletePortfolioApi(portfolio._id);
            setLoading(false);
            toast.success("삭제 성공 🎉");
            reload();
        } catch (error) {
            setLoading(false);
            toast.error("삭제 실패 🤡");
        }
    };

    return (
        <>
            <div
                className={`portfolio ${(index + 1) % 2 === 0 && "double"}`}
                key={portfolio._id}
            >
                <div className="portfolio__index">{index + 1}</div>
                <div className="portfolio__title">{portfolio.rep.title}</div>
                <div className="portfolio__description">{portfolio.rep.description}</div>
                <div className="portfolio__btnContainer">
                    <div
                        className="delete btn"
                        onClick={() => {
                            setCreateConfirm(true);
                        }}
                    >
                        삭제
                    </div>
                </div>
            </div>
            <Confirm
                show={createConfirm}
                setShow={setCreateConfirm}
                title="정말 삭제하시겠습니까?"
                loading={loading}
                successCallback={deletePortfolio}
            />
        </>
    );
};

function AdminPortfolio() {
    const portfoliosLoadable = useRecoilValueLoadable(allGetPortfolioSelector);

    const portfolios = useMemo(() => {
        return portfoliosLoadable.state === "hasValue" ? portfoliosLoadable.contents : [];
    }, [portfoliosLoadable]);

    return (
        <Container className="default-container">
            <PortfolioContainer className="row">
                {portfolios.map((portfolio, index) => (
                    <PortfolioRow
                        key={portfolio._id}
                        portfolio={portfolio}
                        index={index}
                    />
                ))}
            </PortfolioContainer>
            <div className="row">
                <Preview />
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    gap: 20px;
    input,
    textarea {
        border: 1px solid black;
    }
    .svg {
        width: 18px;
        height: 18px;
        padding: 8px;
        cursor: pointer;
        border: 1px solid ${(props) => props.theme.hoverColor};
        border-radius: 5px;
    }
    .row {
        margin-top: 10px;
        &:first-child {
            width: 55%;
        }
        &:last-child {
            width: 45%;
        }
    }
`;

const PortfolioContainer = styled.div`
    height: auto;
    width: 100%;
    .portfolio {
        height: 50px;
        width: 100%;
        display: flex;
        background-color: #e6e6e6;
        align-items: center;
        div {
            padding: 0 10px;
            text-align: center;
        }
        &__index {
            font-size: 20px;
            font-weight: 700;
            width: 100px;
        }
        &__title {
            font-size: 20px;
            font-weight: 500;
            width: 30%;
        }
        &__description {
            font-size: 20px;
            font-weight: 300;
            overflow: hidden;
            width: 50%;
        }
        &__btnContainer {
            width: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            .btn {
                width: 60px;
                padding: 10px 0;
                cursor: pointer;
                background-color: ${(props) => props.theme.darkGray};
                color: ${(props) => props.theme.white};
            }
            .delete {
                background-color: ${(props) => props.theme.accentColor};
                color: ${(props) => props.theme.white};
            }
        }
    }
    .double {
        background-color: #f7f7f7;
    }
`;

export default AdminPortfolio;
