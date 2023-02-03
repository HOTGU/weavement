import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import ContactCard from "../Components/Contact/ContactCard";
import Loader from "../Components/Loader";
import { contactListSelector, filterInputAtom, filterItemAtom } from "../atoms/contact";
import Modal from "../Components/Modal";
import ContactFilterForm from "../Components/Contact/ContactFilterForm";
import ContactFilterHead from "../Components/Contact/ContactFilterHead";
import Metatag from "../Components/Metatag";
import { getCSRFToken } from "../api";
import { toast } from "react-toastify";

function AdminContact() {
    const [filterItem, setFilterItem] = useRecoilState(filterItemAtom);
    const [filterInput, setFilterInput] = useRecoilState(filterInputAtom);
    const contactList = useRecoilValueLoadable(contactListSelector);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getCSRFToken();
    }, []);

    const contacts = useMemo(() => {
        return contactList.state === "hasValue" ? contactList.contents : [];
    }, [contactList]);

    useEffect(() => {
        if (contactList.state === "hasError") {
            toast.error("에러가 발생했습니다");
        }
    }, [contactList.state]);

    return (
        <div>
            <Metatag title="위브먼트Admin | 문의" />
            <ResultContainer>
                <ContactFilterHead setShow={setShow} excelData={contacts} />

                {contactList.state === "loading" ? (
                    <Loader isCenter={true} width="40px" height="40px" />
                ) : (
                    <>
                        <Modal show={show} setShow={setShow}>
                            <ContactFilterForm setShow={setShow} />
                        </Modal>
                        {filterItem && (
                            <SearchText>
                                {filterItem.year && (
                                    <div>
                                        <span>{filterItem.year}년</span>
                                        {/* <FontAwesomeIcon
                                            icon={faTimesCircle}
                                            onClick={() => {
                                                setFilterItem({
                                                    ...filterItem,
                                                    year: new Date().getFullYear(),
                                                });
                                                setFilterInput({
                                                    ...filterInput,
                                                    year: new Date().getFullYear(),
                                                });
                                            }}
                                        /> */}
                                    </div>
                                )}
                                {filterItem.month && (
                                    <div>
                                        <span>{filterItem.month}월</span>
                                        <FontAwesomeIcon
                                            icon={faTimesCircle}
                                            onClick={() => {
                                                setFilterItem({
                                                    ...filterItem,
                                                    month: "",
                                                });
                                                setFilterInput({
                                                    ...filterInput,
                                                    month: "",
                                                });
                                            }}
                                        />
                                    </div>
                                )}
                                {filterItem.state && (
                                    <div>
                                        <span>{filterItem.state}</span>
                                        <FontAwesomeIcon
                                            icon={faTimesCircle}
                                            onClick={() => {
                                                setFilterItem({
                                                    ...filterItem,
                                                    state: "",
                                                });
                                                setFilterInput({
                                                    ...filterInput,
                                                    state: "",
                                                });
                                            }}
                                        />
                                    </div>
                                )}
                                {filterItem.company && (
                                    <div>
                                        <span>{filterItem.company}</span>
                                        <FontAwesomeIcon
                                            icon={faTimesCircle}
                                            onClick={() => {
                                                setFilterItem({
                                                    ...filterItem,
                                                    company: "",
                                                });
                                                setFilterInput({
                                                    ...filterInput,
                                                    company: "",
                                                });
                                            }}
                                        />
                                    </div>
                                )}
                                {filterItem.phone && (
                                    <div>
                                        <span>{filterItem.phone}</span>
                                        <FontAwesomeIcon
                                            icon={faTimesCircle}
                                            onClick={() => {
                                                setFilterItem({
                                                    ...filterItem,
                                                    phone: "",
                                                });
                                                setFilterInput({
                                                    ...filterInput,
                                                    phone: "",
                                                });
                                            }}
                                        />
                                    </div>
                                )}
                            </SearchText>
                        )}

                        <ItemContainer>
                            {contacts.map((item, index) => (
                                <ContactCard key={index} data={item} />
                            ))}
                        </ItemContainer>
                    </>
                )}
            </ResultContainer>
        </div>
    );
}

const ResultContainer = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 1800px;
    padding: 30px;
    height: 100%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
`;

const SearchText = styled.div`
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    div {
        display: flex;
        align-items: center;
        font-weight: 300;
        background-color: ${(props) => props.theme.blue};
        color: ${(props) => props.theme.white};
        padding: 6px 8px;
        border-radius: 20px;
        cursor: default;
        gap: 5px;
        svg {
            cursor: pointer;
        }
    }
`;

export default AdminContact;
