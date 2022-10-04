import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { filterInputAtom, filterItemAtom } from "../../atoms/contact";
import Button from "../Button";
import Input from "../Input";

function ContactFilterForm({ setShow }) {
    const [filterItem, setFilterItem] = useRecoilState(filterItemAtom);
    const [filterInput, setFilterInput] = useRecoilState(filterInputAtom);

    return (
        <FilterForm>
            <div className="form__column">
                <span>회사명</span>
                <Input
                    type="text"
                    name="company"
                    value={filterInput.company}
                    onChange={(e) => {
                        setFilterInput({
                            ...filterInput,
                            company: e.target.value,
                        });
                    }}
                ></Input>
            </div>
            <div className="form__column">
                <span>전화번호</span>
                <Input
                    type="text"
                    name="phone"
                    value={filterInput.phone}
                    onChange={(e) => {
                        setFilterInput({
                            ...filterInput,
                            phone: e.target.value,
                        });
                    }}
                ></Input>
            </div>

            <Button
                onClick={(e) => {
                    setShow(false);
                    setFilterItem({
                        ...filterItem,
                        company: filterInput.company,
                        phone: filterInput.phone,
                    });
                }}
            >
                검색
            </Button>
        </FilterForm>
    );
}

const FilterForm = styled.div`
    padding: 30px;
    width: 400px;
    .form__column {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        span {
            flex: 2;
            font-size: 20px;
            font-weight: 700;
        }
        input {
            flex: 4;
        }
    }
    .submit-btn {
        width: 100%;
        border
    }
`;
export default ContactFilterForm;
