import React, { useState } from "react";
import styled from "styled-components";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import Moment from "react-moment";
import { toast } from "react-toastify";

import { deleteContactApi } from "../../api";
import { contactListSelector, currentContactIdAtom } from "../../atoms/contact";
import Modal from "../Modal";
import Confirm from "../Confirm";
import UpdateForm from "./UpdateForm";
import NoteContainer from "./NoteContainer";

function ContactCard({ data }) {
    const [showContact, setShowContact] = useState(false);
    const [showCounsel, setShowCounsel] = useState(false);
    const [showSign, setShowSign] = useState(false);
    const [show, setShow] = useState(false);
    const [showNote, setShowNote] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const setCurrentContactId = useSetRecoilState(currentContactIdAtom);
    const reload = useResetRecoilState(contactListSelector);

    const deleteContact = async () => {
        setLoading(true);
        try {
            await deleteContactApi(data._id);
            setLoading(false);
            reload();
            toast.success("ě­ě  ěąęłľ đ");
        } catch (error) {
            toast.error("ě­ě  ě¤í¨ đ¤Ą");
            setLoading(false);
        }
    };
    return (
        <>
            <Container isState={data.state}>
                <BtnWrapper>
                    {data.isImage && <Btn>đ</Btn>}

                    <Btn
                        onClick={() => {
                            setShowContact(false);
                            setShowCounsel(false);
                            setShowSign(false);
                            setShowNote(true);
                            setCurrentContactId(data._id);
                        }}
                    >
                        đ
                    </Btn>
                    <Btn
                        onClick={() => {
                            setShowContact(false);
                            setShowCounsel(false);
                            setShowSign(false);
                            setShow(true);
                        }}
                    >
                        đ¨
                    </Btn>
                    <Btn
                        onClick={() => {
                            setConfirm(true);
                        }}
                    >
                        â
                    </Btn>
                </BtnWrapper>
                <RowWrapper>
                    <StateBtn className="contact__state" isState={data.state}>
                        {data.state}
                    </StateBtn>
                    {(data.clientCompany || data.clientName) && (
                        <span className="contact__clientCompany">
                            {data.clientCompany || `${data.clientName} ë`}
                        </span>
                    )}
                </RowWrapper>
                <RowWrapper>
                    {data.createdAt && (
                        <span className="row__text date">
                            <Moment format="MM/DD HH:mm">{data.createdAt}</Moment>
                        </span>
                    )}
                    {data.clientStartPhone && (
                        <span className="row__text">
                            {data.clientStartPhone}-{data.clientMiddlePhone}-
                            {data.clientEndPhone}
                        </span>
                    )}
                </RowWrapper>

                {(data.state === "ěë´" || data.state === "ęłě˝") && (
                    <SecondRowWrapper>
                        {data.state === "ěë´" && !showCounsel && (
                            <>
                                {data.pm && (
                                    <span className="slash-item"> {data.pm}</span>
                                )}
                                {data.meterial.length > 0 && (
                                    <span className="slash-item">
                                        {data.meterial.map((item, index, { length }) => {
                                            if (length - 1 === index) {
                                                return <span key={index}>{item}</span>;
                                            } else {
                                                return <span key={index}>{item},</span>;
                                            }
                                        })}
                                    </span>
                                )}

                                {data.content && (
                                    <span className="slash-item"> {data.content}</span>
                                )}

                                {data.size && (
                                    <span className="slash-item"> {data.size}</span>
                                )}
                                {data.due && (
                                    <span className="slash-item"> {data.due}</span>
                                )}
                            </>
                        )}
                        {data.state === "ęłě˝" && !showSign && (
                            <>
                                {data.pm && (
                                    <span className="slash-item"> {data.pm}</span>
                                )}
                                {data.meterial.length > 0 && (
                                    <span className="slash-item">
                                        {data.meterial.map((item, index, { length }) => {
                                            if (length - 1 === index) {
                                                return <span key={index}>{item}</span>;
                                            } else {
                                                return <span key={index}>{item},</span>;
                                            }
                                        })}
                                    </span>
                                )}
                                {data.content && (
                                    <span className="slash-item">{data.content}</span>
                                )}
                                {data.deadline && (
                                    <span className="slash-item">
                                        <Moment format="MM/DD">{data.deadline}</Moment>
                                    </span>
                                )}

                                {data.orderCompany && (
                                    <span className="slash-item">
                                        {" "}
                                        {data.orderCompany}
                                    </span>
                                )}
                            </>
                        )}
                    </SecondRowWrapper>
                )}
                <LastRowWrapper>
                    <ShowBtn
                        onClick={() => {
                            setShowCounsel(false);
                            setShowSign(false);
                            setShowContact(!showContact);
                        }}
                        isOpen={showContact}
                    >
                        ëŹ¸ěë´ěŠ
                    </ShowBtn>
                    {(data.state === "ěë´" || data.state === "ëśë°") && (
                        <ShowBtn
                            onClick={() => {
                                setShowContact(false);
                                setShowSign(false);
                                setShowCounsel(!showCounsel);
                            }}
                            isOpen={showCounsel}
                        >
                            ěë´ë´ěŠ
                        </ShowBtn>
                    )}
                    {(data.state === "ęłě˝" || data.state === "ěëŁ") && (
                        <>
                            <ShowBtn
                                onClick={() => {
                                    setShowContact(false);
                                    setShowSign(false);
                                    setShowCounsel(!showCounsel);
                                }}
                                isOpen={showCounsel}
                            >
                                ěë´ë´ěŠ
                            </ShowBtn>
                            <ShowBtn
                                onClick={() => {
                                    setShowContact(false);
                                    setShowCounsel(false);
                                    setShowSign(!showSign);
                                }}
                                isOpen={showSign}
                            >
                                ęłě˝ë´ěŠ
                            </ShowBtn>
                        </>
                    )}
                </LastRowWrapper>
                {showContact && (
                    <ColumnWrapper>
                        {data.step && (
                            <Column>
                                <div className="column__text">ë¨ęł</div>
                                <div> {data.step}</div>
                            </Column>
                        )}
                        {data.hasDesign && (
                            <Column>
                                <div className="column__text">ëëŠ´ ëěě¸ ěŹëś</div>
                                <div> {data.hasDesign}</div>
                            </Column>
                        )}
                        {data.cost && (
                            <Column>
                                <div className="column__text">ěě°</div>
                                <div> {data.cost}</div>
                            </Column>
                        )}
                        {data.schedule && (
                            <Column>
                                <div className="column__text">ę¸°ę°</div>
                                <div> {data.schedule}</div>
                            </Column>
                        )}
                        {data.knowPath && (
                            <Column>
                                <div className="column__text">ěę˛ë ę˛˝ëĄ</div>
                                <div> {data.knowPath}</div>
                            </Column>
                        )}
                        {data.knowPlatform && (
                            <Column>
                                <div className="column__text">ěę˛ë íëŤíź</div>
                                <div> {data.knowPlatform}</div>
                            </Column>
                        )}
                        {data.contactPath && (
                            <Column>
                                <div className="column__text">ě ě ę˛˝ëĄ</div>
                                <div> {data.contactPath}</div>
                            </Column>
                        )}
                        {data.description && (
                            <Description>
                                <div className="column__text">ë´ěŠ</div>
                                <div> {data.description}</div>
                            </Description>
                        )}
                        {data.clientName && (
                            <Column>
                                <div className="column__text">ë´ëšě</div>
                                <div> {data.clientName}</div>
                            </Column>
                        )}
                        {data.clientPosition && (
                            <Column>
                                <div className="column__text">ě§ę¸</div>
                                <div> {data.clientPosition}</div>
                            </Column>
                        )}
                        {data.clientEmail && (
                            <Column>
                                <div className="column__text">ě´ëŠěź</div>
                                <div> {data.clientEmail}</div>
                            </Column>
                        )}
                        {data.clientHomepage && (
                            <Column>
                                <div className="column__text">ííě´ě§</div>
                                <div> {data.clientHomepage}</div>
                            </Column>
                        )}
                        {data.clientRequest && (
                            <Description>
                                <div className="column__text">ěě˛­ěŹí­</div>
                                <div> {data.clientRequest}</div>
                            </Description>
                        )}
                    </ColumnWrapper>
                )}
                {showCounsel && (
                    <ColumnWrapper>
                        {data.pm && (
                            <Column>
                                <div className="column__text">PM</div>
                                <div> {data.pm}</div>
                            </Column>
                        )}
                        {data.detail && (
                            <Description>
                                <div className="column__text">ë´ěŠ</div>
                                <div> {data.detail}</div>
                            </Description>
                        )}
                        {data.meterial.length > 0 && (
                            <Column>
                                <div className="column__text">ěěŹ</div>
                                <div>
                                    {data.meterial.map((item, index, { length }) => {
                                        if (length - 1 === index) {
                                            return <span key={index}>{item}</span>;
                                        } else {
                                            return <span key={index}>{item},</span>;
                                        }
                                    })}
                                </div>
                            </Column>
                        )}

                        {data.content && (
                            <Column>
                                <div className="column__text">ě˝íě¸ </div>
                                <div> {data.content}</div>
                            </Column>
                        )}

                        {data.size && (
                            <Column>
                                <div className="column__text">íŹę¸°</div>
                                <div> {data.size}</div>
                            </Column>
                        )}
                        {data.due && (
                            <Column>
                                <div className="column__text">ěźě </div>
                                <div> {data.due}</div>
                            </Column>
                        )}
                    </ColumnWrapper>
                )}
                {showSign && (
                    <ColumnWrapper>
                        {data.pm && (
                            <Column>
                                <div className="column__text">PM</div>
                                <div> {data.pm}</div>
                            </Column>
                        )}
                        {data.meterial.length > 0 && (
                            <Column>
                                <div className="column__text">ěěŹ</div>
                                <div>
                                    {data.meterial.map((item, index, { length }) => {
                                        if (length - 1 === index) {
                                            return <span key={index}>{item}</span>;
                                        } else {
                                            return <span key={index}>{item},</span>;
                                        }
                                    })}
                                </div>
                            </Column>
                        )}
                        {data.content && (
                            <Column>
                                <div className="column__text">ě˝íě¸ </div>
                                <div>{data.content}</div>
                            </Column>
                        )}
                        {data.deadline && (
                            <Column>
                                <div className="column__text">ëŠę¸°ěź</div>
                                <div>
                                    <Moment format="MMěDDěź">{data.deadline}</Moment>
                                </div>
                            </Column>
                        )}
                        {data.orderCompany && (
                            <Column>
                                <div className="column__text">íë ĽěŹ</div>
                                <div> {data.orderCompany}</div>
                            </Column>
                        )}
                    </ColumnWrapper>
                )}
            </Container>
            <Modal show={show} setShow={setShow}>
                <UpdateForm data={data} setModal={setShow} />
            </Modal>
            <Modal show={showNote} setShow={setShowNote}>
                <NoteContainer contact={data} show={showNote} setShow={setShowNote} />
            </Modal>
            <Confirm
                show={confirm}
                setShow={setConfirm}
                title="ě ë§ ě­ě íěę˛ ěľëęš?"
                loading={loading}
                successCallback={deleteContact}
            />
        </>
    );
}

const Container = styled.div`
    border: 1px solid ${(props) => props.theme.hoverColor};
    border-radius: 5px;
    padding: 10px 12px;
    width: 380px;
    height: fit-content;
    cursor: default;
    position: relative;
    z-index: 1;
`;

const RowWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    .contact__clientCompany {
        font-weight: 700;
        font-size: 18px;
    }
    .row__text {
        font-weight: 300;
        font-size: 16px;
    }
    .date {
        font-style: oblique;
        font-size: 14px;
    }
`;
const SecondRowWrapper = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    font-style: italic;
    margin-bottom: 8px;
    .slash-item {
        &:not(:last-child) {
            border-right: 1px solid #a4b0be;
            padding-right: 5px;
            margin-right: 5px;
        }
    }
`;
const LastRowWrapper = styled.div`
    display: flex;
    gap: 10px;
`;
const ShowBtn = styled.div`
    padding: 6px 8px;
    border: 1px solid ${(props) => props.theme.borderColor};
    cursor: pointer;
    background-color: ${(props) => (props.isOpen ? props.theme.blue : "")};
    color: ${(props) => (props.isOpen ? "white" : "")};
`;

const ColumnWrapper = styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    .column__text {
        font-weight: 200;
    }
`;
const Column = styled.div`
    display: flex;
    width: inherit;
    div {
        &:first-child {
            flex: 5;
        }
        &:last-child {
            flex: 6;
        }
    }
`;
const Description = styled.div`
    display: block;
    max-width: 400px;
    div:first-child {
        margin-bottom: 5px;
    }
    div:last-child {
        white-space: pre-line;
        line-height: 20px;
    }
`;

const BtnWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin: 2px;
    display: flex;
    gap: 2px;
`;

const Btn = styled.span`
    cursor: pointer;
    width: 28px;
    height: 28px;
    border: 1px solid ${(props) => props.theme.darkGrayColor};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StateBtn = styled.span`
    background-color: ${(props) => props.isState === "ëŹ¸ě" && "#5758BB"};
    background-color: ${(props) => props.isState === "ěë´" && "#006266"};
    background-color: ${(props) => props.isState === "ęłě˝" && "#d28f13"};
    background-color: ${(props) => props.isState === "ěëŁ" && "#00a8ff"};
    background-color: ${(props) => props.isState === "ëśë°" && "#9e0b0b"};
    padding: 3px 5px;
    color: white;
`;

export default ContactCard;
