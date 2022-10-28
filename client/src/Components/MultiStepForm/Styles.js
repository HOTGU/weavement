import styled from "styled-components";
import { device } from "../../device";

export const SForm = styled.form`
    .btnContainer {
        display: flex;
        justify-content: center;
        gap: 10px;
        .prev {
            background-color: ${(props) => props.theme.hoverColor};
        }
        .next {
            background-color: ${(props) => props.theme.accentColor};
        }
        .btnItem {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 150px;
            height: 50px;
            color: white;
            cursor: pointer;
            @media ${device.mobile} {
                width: 70px;
                height: 40px;
            }
        }
    }
`;

export const Column = styled.div`
    width: 100%;
    color: ${(props) => props.theme.darkGrayColor};
    margin-bottom: 40px;
    @media ${device.tablet} {
        margin-bottom: 30px;
    }
    @media ${device.mobile} {
        margin-bottom: 25px;
    }
    .column__head {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 14px;
        @media ${device.mobile} {
            margin-bottom: 10px;
            font-size: 16px;
        }
    }

    .column__info {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        @media ${device.mobile} {
            gap: 4px;
            flex-direction: column;
        }
        select,
        input,
        .box {
            width: 100%;
            flex: 1;
            border: 1px solid ${(props) => props.theme.borderColor};
            padding: 6px 8px;
            border-radius: 4px;
            font-size: 14px;
            @media ${device.mobile} {
                font-size: 12px;
            }
            svg {
                margin-left: 5px;
                color: ${(props) => props.theme.red};
                cursor: pointer;
            }
        }
        label {
            width: 100%;
            div {
                border: 1px solid ${(props) => props.theme.borderColor};
                padding: 6px 8px;
                border-radius: 4px;
                font-size: 14px;
                cursor: pointer;
                text-align: center;
                transition: all 0.2s ease-in-out;
                @media ${device.mobile} {
                    font-size: 12px;
                }
            }
            input[type="radio"]:checked,
            input[type="checkbox"]:checked {
                + div {
                    background-color: ${(props) => props.theme.accentColor};
                    color: white;
                }
            }
            input[type="radio"] {
                display: none;
            }
        }
        select,
        .upload-btn {
            cursor: pointer;
        }
        .upload-btn {
            width: fit-content;
            border: 1px solid ${(props) => props.theme.accentColor};
            color: ${(props) => props.theme.accentColor};
            transition: all 0.2s ease-in-out;
            &:hover {
                background-color: ${(props) => props.theme.accentColor};
                color: white;
            }
        }
        .acceptText {
            font-size: 12px;
            font-weight: 300;
            line-height: 16px;
            margin-bottom: 5px;
        }
        .rowLabel {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .phoneContainer {
            display: flex;
            gap: 20px;
            @media ${device.mobile} {
                gap: 4px;
            }
        }
    }
    input,
    textarea {
        transition: all 0.2s ease-in-out;
        &:focus {
            border: 2px solid ${(props) => props.theme.accentColor};
        }
        &::placeholder {
            color: ${(props) => props.theme.hoverColor};
        }
    }
    p {
        color: ${(props) => props.theme.red};
        font-size: 14px;
        margin-top: 5px;
        @media ${device.mobile} {
            font-size: 12px;
        }
    }
    .phone-btn {
        width: 50px;
        @media ${device.mobile} {
            width: 50px;
        }
    }
`;

export const SSelect = styled.select`
    outline: none;
    background-color: ${(props) => (props.isValue ? props.theme.accentColor : "white")};
    border: 1px solid ${(props) => props.theme.borderColor};
    color: ${(props) => (props.isValue ? "white" : props.theme.textColor)};
    @media ${device.mobile} {
        flex: none;
        width: 100%;
    }
    option {
        outline: none;
    }
`;
