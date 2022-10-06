import React, { useState } from "react";
import {
    faFilter,
    faRefresh,
    faPlus,
    faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";

import {
    contactListSelector,
    filterInputAtom,
    filterItemAtom,
} from "../../atoms/contact";
import Modal from "../Modal";
import AdminCreateContactForm from "../Form/AdminCreateContactForm";
import moment from "moment";

const FilterWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    select,
    .svg {
        cursor: pointer;
        border: 1px solid ${(props) => props.theme.hoverColor};
        border-radius: 5px;
    }
    select {
        width: fit-content;
        outline: none;
    }
    .svg {
        width: 18px;
        height: 18px;
        padding: 8px;
    }
`;

function ContactFilterHead({ setShow, excelData }) {
    const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [filterItem, setFilterItem] = useRecoilState(filterItemAtom);
    const [filterInput, setFilterInput] = useRecoilState(filterInputAtom);
    const reload = useResetRecoilState(contactListSelector);
    const [createModal, setCraeteModal] = useState(false);

    const handleClickReload = () => {
        reload();
    };

    const data = excelData.map((contact, index) => ({
        ...contact,
        id: index + 1,
        client: `회사명: ${contact.clientCompany} \n성함: ${contact.clientName} \n직급: ${contact.clientPosition} \n번호: ${contact.clientStartPhone}-${contact.clientMiddlePhone}-${contact.clientEndPhone} \n홈페이지: ${contact.clientHomepage} \n이메일: ${contact.clientEmail} \n특이사항 :${contact.clientRequest}`,
        request: contact.note
            .filter((note) => {
                const isRequest = Boolean(note.category === "질문");
                return isRequest;
            })
            .map((note) => {
                return `${moment(note.noteDate).format("MM월DD일")} \n${note.text} \n`;
            }),
        response: contact.note
            .filter((note) => {
                const isRequest = Boolean(note.category === "답변");
                return isRequest;
            })
            .map((note) => {
                return `${moment(note.noteDate).format("MM월DD일")} \n${note.text}\n`;
            }),
        alert: contact.note
            .filter((note) => {
                const isRequest = Boolean(note.category === "공지");
                return isRequest;
            })
            .map((note) => {
                return `${moment(note.noteDate).format("MM월DD일")}\n${note.text}\n`;
            }),
        createdAt: `${moment(contact.createdAt).format("YYYY년MM월DD일")}`,
    }));

    const headers = [
        { label: "Id", key: "id" },
        { label: "상태", key: "state" },
        { label: "생성날짜", key: "createdAt" },
        { label: "단계", key: "step" },
        { label: "디자인여부", key: "hasDesign" },
        { label: "예산", key: "cost" },
        { label: "일정", key: "schedule" },
        { label: "문의내용", key: "description" },
        { label: "예시", key: "like" },
        { label: "알게된경로", key: "knowPath" },
        { label: "클라이언트", key: "client" },
        { label: "재료", key: "meterial" },
        { label: "콘텐츠", key: "content" },
        { label: "크기", key: "size" },
        { label: "일정", key: "due" },
        { label: "PM", key: "pm" },
        { label: "협력사", key: "orderCompany" },
        { label: "납기일", key: "deadline" },
        { label: "질문내용", key: "request" },
        { label: "문의내용", key: "response" },
        { label: "공지", key: "alert" },
    ];

    return (
        <FilterWrapper>
            <select
                name="month"
                value={filterInput.month}
                onChange={(e) => {
                    setFilterInput({
                        ...filterInput,
                        month: e.target.value,
                    });
                    setFilterItem({
                        ...filterItem,
                        month: e.target.value,
                    });
                }}
            >
                <option value="">월별로 보기</option>
                {monthArr.map((month, i) => {
                    return (
                        <option key={i} value={month}>
                            {month}월
                        </option>
                    );
                })}
            </select>
            <select
                name="state"
                value={filterInput.state}
                onChange={(e) => {
                    setFilterInput({
                        ...filterInput,
                        state: e.target.value,
                    });
                    setFilterItem({
                        ...filterItem,
                        state: e.target.value,
                    });
                }}
            >
                <option value="">상태로 보기</option>
                <option value="문의">문의</option>
                <option value="상담">상담</option>
                <option value="계약">계약</option>
                <option value="완료">완료</option>
            </select>
            <div onClick={() => setShow(true)}>
                <FontAwesomeIcon className="svg" icon={faFilter} />
            </div>
            <div onClick={handleClickReload}>
                <FontAwesomeIcon className="svg" icon={faRefresh} />
            </div>
            <div onClick={() => setCraeteModal(true)}>
                <FontAwesomeIcon className="svg" icon={faPlus} />
            </div>
            <div>
                <CSVLink
                    headers={headers}
                    data={data}
                    filename={`${moment().format("YYMMDD")}_프로젝트관리`}
                >
                    <FontAwesomeIcon className="svg" icon={faFileExcel} />
                </CSVLink>
            </div>

            <Modal show={createModal} setShow={setCraeteModal}>
                <AdminCreateContactForm setModal={setCraeteModal} />
            </Modal>
        </FilterWrapper>
    );
}

export default ContactFilterHead;