import React from "react";
import styled from "styled-components";

import Modal from "./Modal";
import Loader from "./Loader";

function Confirm({ show, setShow, title, successCallback, loading }) {
    return (
        <div>
            <Modal show={show} setShow={setShow}>
                <Wrapper>
                    <div className="text">{title}</div>
                    <div className="btn-container">
                        <div className="no btn" onClick={(e) => setShow(false)}>
                            아니오
                        </div>
                        <div className="yes btn" onClick={successCallback}>
                            {loading ? <Loader /> : "네"}
                        </div>
                    </div>
                </Wrapper>
            </Modal>
        </div>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: fit-content;
    min-width: 400px;
    max-width: 400px;
    .text {
        font-size: 20px;
        margin-bottom: 30px;
    }
    .btn-container {
        align-self: flex-end;
        display: flex;
        gap: 15px;
        .btn {
            width: 80px;
            height: 35px;
            color: white;
            border-radius: 3px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .no {
            background-color: ${(props) => props.theme.darkGray};
        }
        .yes {
            background-color: ${(props) => props.theme.subAccentColor};
        }
    }
`;

export default Confirm;
