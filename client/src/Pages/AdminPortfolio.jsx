import React, { useMemo, useState } from "react";
// import { useForm } from "react-hook-form";
import styled from "styled-components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValueLoadable, useResetRecoilState } from "recoil";
import { toast } from "react-toastify";

import CreatePortfolioForm from "../Components/Form/CreatePortfolioForm";
import { allGetPortfolioSelector } from "../atoms/portfolio";
import { deletePortfolioApi } from "../api";
import Confirm from "../Components/Confirm";
import Modal from "../Components/Modal";

const PortfolioRow = ({ portfolio, index }) => {
    const [createConfirm, setCreateConfirm] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
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
                <div className="portfolio__title">{portfolio.text.title}</div>
                <div className="portfolio__description">{portfolio.text.description}</div>
                <div className="portfolio__btnContainer">
                    <div
                        className="btn"
                        onClick={() => {
                            setUpdateModal(true);
                        }}
                    >
                        수정
                    </div>
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
            <Modal show={updateModal} setShow={setUpdateModal}>
                <ModalContainer>
                    <CreatePortfolioForm
                        setModal={setUpdateModal}
                        isUpdate={true}
                        data={portfolio}
                    />
                </ModalContainer>
            </Modal>
        </>
    );
};

function AdminPortfolio() {
    const [createModal, setCraeteModal] = useState(false);
    const portfoliosLoadable = useRecoilValueLoadable(allGetPortfolioSelector);

    // const { handleSubmit, register, watch } = useForm();

    // console.log(watch().column);

    const portfolios = useMemo(() => {
        return portfoliosLoadable.state === "hasValue" ? portfoliosLoadable.contents : [];
    }, [portfoliosLoadable]);

    return (
        <Container className="default-container">
            <div onClick={() => setCraeteModal(true)}>
                <FontAwesomeIcon className="svg" icon={faPlus} />
            </div>
            <PortfolioContainer>
                {portfolios.map((portfolio, index) => (
                    <PortfolioRow portfolio={portfolio} index={index} />
                ))}
            </PortfolioContainer>
            {/* <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <select {...register("column")}>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
            </form> */}

            <Modal show={createModal} setShow={setCraeteModal}>
                <ModalContainer>
                    <CreatePortfolioForm setModal={setCraeteModal} isUpdate={false} />
                </ModalContainer>
            </Modal>
        </Container>
    );
}

const Container = styled.div`
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

const PortfolioContainer = styled.div`
    margin: 20px 0;
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
