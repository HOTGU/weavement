import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { faCircleCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useRecoilValue } from "recoil";

import Modal from "../Components/Modal";
import {
    pageColumnAtom,
    pageImagesAtom,
    thumbImageWhereAtom,
    totalColumnAtom,
} from "../atoms/adminPortfolio";
import CreatePortfolioForm from "../Components/Form/CreatePortfolioForm";
// import { allGetPortfolioSelector } from "../atoms/portfolio";

function AdminPortfolio() {
    const [createModal, setCraeteModal] = useState(false);
    const totalColumn = useRecoilValue(totalColumnAtom);
    // const portfoliosLoadable = useRecoilStateLoadable(allGetPortfolioSelector);

    const { watch } = useForm();

    const watchAll = watch();

    return (
        <Container>
            <div onClick={() => setCraeteModal(true)}>
                <FontAwesomeIcon className="svg" icon={faPlus} />
            </div>
            <Modal show={createModal} setShow={setCraeteModal}>
                <ModalContainer>
                    <CreatePortfolioForm setModal={setCraeteModal} />

                    <Preview>
                        <h3>미리보기</h3>
                        {[...Array(totalColumn)].map((e, i) => {
                            return (
                                <div key={i}>
                                    <CreateImages target={i + 1} watchAll={watchAll} />
                                </div>
                            );
                        })}
                    </Preview>
                </ModalContainer>
            </Modal>
        </Container>
    );
}

const CreateImages = ({ target, watchAll }) => {
    const column = useRecoilValue(pageColumnAtom);
    const images = useRecoilValue(pageImagesAtom);

    const [thumb, setThumb] = useRecoilState(thumbImageWhereAtom);

    const isText = Boolean(
        (target === 1 && watchAll.where === "top") ||
            (target === 2 && watchAll.where === "middle") ||
            (target === 3 && watchAll.where === "bottom")
    );

    return (
        <>
            {isText && (
                <TextWrapper>
                    <div className="textTitle">{watchAll.title}</div>
                    <div className="textDescription">{watchAll.description}</div>
                </TextWrapper>
            )}
            <div className="column">
                {column[target]?.length > 0 &&
                    column[target].map((n, index) => {
                        return (
                            <div className="wrapper" key={index}>
                                {images.map((i, imageIndex) => {
                                    if (i.where === `${target}-${n}`) {
                                        return (
                                            <>
                                                <img
                                                    key={imageIndex}
                                                    src={i.url}
                                                    alt="img"
                                                    onClick={() => {
                                                        setThumb(i.where);
                                                    }}
                                                />
                                                {i.where === thumb && (
                                                    <div className="isThumb">
                                                        <FontAwesomeIcon
                                                            icon={faCircleCheck}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        );
                                    } else {
                                        return false;
                                    }
                                })}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    .textTitle {
        font-size: 12px;
        font-weight: 700;
        margin-bottom: 4px;
    }
    .textDescription {
        font-size: 10px;
        font-weight: 300;
        white-space: pre-line;
        text-align: center;
    }
`;

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 1800px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .svg {
        width: 18px;
        height: 18px;
        padding: 8px;
        cursor: pointer;
        border: 1px solid ${(props) => props.theme.hoverColor};
        border-radius: 5px;
    }
`;

const ModalContainer = styled.div`
    display: flex;
    gap: 30px;
    padding: 30px;
    width: auto;
    max-height: 800px;
    h3 {
        text-align: center;
        font-size: 18px;
        margin: 6px auto;
    }
`;

const Preview = styled.div`
    width: 400px;
    height: auto;
    border: 1px solid ${(props) => props.theme.gray};
    overflow-y: scroll;
    .column {
        width: 310px;
        aspect-ratio: 3/2;
        margin: 0 auto 2px auto;
        display: flex;
        border-radius: 5px;
        gap: 2px;
        .wrapper {
            width: 100%;
            height: 100%;
            background-color: ${(props) => props.theme.gray};
            position: relative;
            img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
                object-fit: cover;
                cursor: pointer;
            }
            .isThumb {
                position: absolute;
                z-index: 50;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                svg {
                    height: 50px;
                    color: rgba(0, 0, 0, 0.5);
                }
            }
        }
    }
`;
export default AdminPortfolio;
