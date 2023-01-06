import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SForm, Column } from "./Styles";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

import { contactFileData, contactFormData } from "../../atoms/contactFormData";
import styled from "styled-components";
import Loader from "../Loader";
import Modal from "../Modal";
import PersonalInfo from "../PersonalInfo";
import { createContactApi } from "../../api";

function ContactAccept({ previousStep, resetStep }) {
    const [formData, setFormData] = useRecoilState(contactFormData);
    const [files, setFiles] = useRecoilState(contactFileData);
    const [accept, setAccept] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm({
        mode: "all",
        defaultValues: formData,
    });

    const watchAll = watch();

    useEffect(() => {
        setValue("knowPlatform", "");
    }, [watchAll.knowPath, setValue]);

    const init = () => {
        reset();
        resetStep();
        setFormData({});
        setFiles([]);
        setAccept(false);
    };

    const onValid = async (data) => {
        if (!accept) {
            toast.error("정보수집을 동의해야 이용이 가능합니다");
            return;
        }
        if (
            !data.step ||
            !data.hasDesign ||
            !data.cost ||
            !data.schedule ||
            !data.description ||
            !data.knowPath ||
            !data.clientName ||
            !data.clientCompany ||
            !data.clientStartPhone ||
            !data.clientMiddlePhone ||
            !data.clientEndPhone ||
            !data.clientEmail
        ) {
            toast.error("필수항목들을 입력하세요");
            return;
        }
        setLoading(true);

        try {
            const fd = new FormData();

            //필수항목들

            fd.append("step", data.step);
            fd.append("hasDesign", data.hasDesign);
            fd.append("cost", data.cost);
            fd.append("schedule", data.schedule);
            fd.append("description", data.description);
            fd.append("knowPath", data.knowPath);
            fd.append("clientName", data.clientName);
            fd.append("clientCompany", data.clientCompany);
            fd.append("clientStartPhone", data.clientStartPhone);
            fd.append("clientMiddlePhone", data.clientMiddlePhone);
            fd.append("clientEndPhone", data.clientEndPhone);
            fd.append("clientEmail", data.clientEmail);

            //선택항목들

            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const options = {
                        maxSizeMB: 3, // 허용하는 최대 사이즈 지정
                        maxWidthOrHeight: 1280, // 허용하는 최대 width, height 값 지정
                        useWebWorker: false, // webworker 사용 여부
                    };
                    if (files[i].file.type.includes("image")) {
                        const compressedBlob = await imageCompression(
                            files[i].file,
                            options
                        );
                        const compressedFile = new File(
                            [compressedBlob],
                            `${compressedBlob.name}`,
                            {
                                type: compressedBlob.type,
                            }
                        );
                        fd.append("images", compressedFile);
                    } else {
                        fd.append("images", files[i].file);
                    }
                }
            }
            fd.append("like", data.like);
            fd.append("clientPosition", data.clientPosition);
            fd.append("clientHomepage", data.clientHomepage);
            fd.append("clientRequest", data.clientRequest);

            await createContactApi(fd);
            toast.success(
                `프로젝트 문의가 완료되었습니다\n빠른 시일내에 회신드리겠습니다`
            );
            init();
        } catch (error) {
            console.log(error);
            toast.error(
                `오류가 발생하였습니다\n이메일이나 전화로 문의 바랍니다\n불편을 드려 죄송합니다 `
            );
        }
        setLoading(false);
    };

    return (
        <SForm onSubmit={handleSubmit(onValid)}>
            <Column>
                <div className="column__head">
                    위브먼트를 알게 된 경로를 선택해주세요. *
                </div>
                <div className="column__info">
                    <label>
                        <input
                            {...register("knowPath", {
                                required: true,
                            })}
                            type="radio"
                            value="검색"
                        />
                        <div className="btn">검색</div>
                    </label>
                    <label>
                        <input
                            {...register("knowPath", {
                                required: true,
                            })}
                            type="radio"
                            value="SNS"
                        />
                        <div className="btn">SNS</div>
                    </label>
                    <label>
                        <input
                            {...register("knowPath", {
                                required: true,
                            })}
                            type="radio"
                            value="지인추천"
                        />
                        <div className="btn">지인추천</div>
                    </label>
                </div>
                {watchAll.knowPath === "SNS" && (
                    <ConditionalColumn>
                        <span>아래 항목도 선택해주세요</span>
                        <div className="column__info">
                            <label>
                                <input
                                    {...register("knowPlatform", {
                                        required: true,
                                    })}
                                    type="radio"
                                    value="인스타그램"
                                />
                                <div className="btn">인스타그램</div>
                            </label>
                            <label>
                                <input
                                    {...register("knowPlatform", {
                                        required: true,
                                    })}
                                    type="radio"
                                    value="페이스북"
                                />
                                <div className="btn">페이스북</div>
                            </label>
                        </div>
                    </ConditionalColumn>
                )}
                {watchAll.knowPath === "검색" && (
                    <ConditionalColumn>
                        <span>아래 항목도 선택해주세요</span>
                        <div className="column__info">
                            <label>
                                <input
                                    {...register("knowPlatform", {
                                        required: true,
                                    })}
                                    type="radio"
                                    value="네이버"
                                />
                                <div className="btn">네이버</div>
                            </label>
                            <label>
                                <input
                                    {...register("knowPlatform", {
                                        required: true,
                                    })}
                                    type="radio"
                                    value="구글"
                                />
                                <div className="btn">구글</div>
                            </label>
                            <label>
                                <input
                                    {...register("knowPlatform", {
                                        required: true,
                                    })}
                                    type="radio"
                                    value="기타"
                                />
                                <div className="btn">기타(다음,줌,etc)</div>
                            </label>
                        </div>
                    </ConditionalColumn>
                )}
                {(errors.knowPath || errors.knowPlatform) && (
                    <p>필수항목을 입력해주세요</p>
                )}
            </Column>
            <Column>
                <div className="column__head">개인정보 수집 동의</div>
                <div className="column__info">
                    <div>
                        <div className="acceptText">
                            수집 항목 : 필수 (성명, 연락처 등) / 선택 (첨부파일 등)
                        </div>
                        <div className="acceptText">
                            수집된 정보는 문의 접수 및 회신에 이용되며 ‘전자상거래’,
                            “정보통신망 이용촉진 및 정보보호” 등 관련 법령에 따라 6개월간
                            보관됩니다. 이용자는 본 동의를 거부할 수 있으며, 미동의 시
                            문의 접수가 불가합니다.
                        </div>
                        <div
                            className="acceptText"
                            style={{ textDecoration: "underline", cursor: "pointer" }}
                            onClick={() => {
                                setShow(!show);
                            }}
                        >
                            자세히 보기
                        </div>
                        <label className="rowLabel">
                            <input
                                type="checkbox"
                                hidden
                                onClick={(e) => {
                                    setAccept(!accept);
                                }}
                            />
                            <div>위 사항을 이해했으며 동의합니다</div>
                        </label>
                    </div>
                </div>
            </Column>
            <div className="btnContainer">
                <div
                    className="btnItem prev"
                    onClick={() => {
                        previousStep();
                        setFormData((prev) => {
                            return { ...prev, knowPath: watchAll.knowPath };
                        });
                    }}
                >
                    이전
                </div>
                <SubmitBtn
                    className="btnItem"
                    isDisabled={loading || !accept}
                    disabled={loading || !accept}
                >
                    {loading ? <Loader width="25px" height="25px" /> : "문의하기"}
                </SubmitBtn>
            </div>
            <Modal show={show} setShow={setShow}>
                <PersonalInfo />
            </Modal>
        </SForm>
    );
}

const SubmitBtn = styled.button`
    background-color: ${(props) =>
        props.isDisabled ? props.theme.hoverColor : props.theme.accentColor};
    cursor: ${(props) => (props.isDisabled ? "not-allowed" : "cursor")};
    transition: all 0.2s ease-in-out;
`;
const ConditionalColumn = styled.div`
    margin-top: 5px;
    span {
        display: inline-block;
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 3px;
    }
`;

export default ContactAccept;
