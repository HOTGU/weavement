import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import styled from "styled-components";

import { contactFileData, contactFormData } from "../../atoms/contactFormData";
import { device } from "../../device";
import { Column, SForm, SSelect } from "./Styles";

function ContactInfo({ nextStep }) {
    const [formData, setFormData] = useRecoilState(contactFormData);
    const [files, setFiles] = useRecoilState(contactFileData);
    const imgRef = useRef();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        mode: "all",
        defaultValues: formData,
    });

    const handleFile = (e) => {
        if (files.length >= 5) {
            toast.error("최대 5장입니다");
            return;
        }
        setFiles((prev) => [
            ...prev,
            {
                file: e.target.files[0],
                name: e.target.files[0].name,
            },
        ]);
    };
    const handleImageDelete = (index) => {
        const filteredFiles = files.filter((__, i) => i !== index);
        setFiles(filteredFiles);

        imgRef.current.value = "";
    };

    const watchAll = watch();

    const onSubmit = (data) => {
        setFormData(data);
        nextStep();
    };

    return (
        <>
            <SForm onSubmit={handleSubmit(onSubmit)}>
                <Column>
                    <div className="column__head">어떤 단계인가요? *</div>
                    <div className="column__info">
                        <label htmlFor="planing">
                            <input
                                type="radio"
                                id="planing"
                                value="기획,예편"
                                {...register("step", {
                                    required: true,
                                })}
                            />
                            <div>기획 및 예산 편성 단계</div>
                        </label>
                        <label htmlFor="design">
                            <input
                                type="radio"
                                id="design"
                                value="디자인,설계"
                                {...register("step", {
                                    required: true,
                                })}
                            />
                            <div>디자인 및 설계 단계</div>
                        </label>
                        <label htmlFor="making">
                            <input
                                type="radio"
                                id="making"
                                value="제작"
                                {...register("step", {
                                    required: true,
                                })}
                            />
                            <div>제작단계</div>
                        </label>
                    </div>
                    {errors.step && <p>필수항목을 입력하세요</p>}
                </Column>
                <Column>
                    <div className="column__head">
                        디자인이나 설계 도면이 준비되셨나요? *
                    </div>
                    <div className="column__info">
                        <label htmlFor="2d">
                            <input
                                {...register("hasDesign", {
                                    required: true,
                                })}
                                type="radio"
                                id="2d"
                                name="hasDesign"
                                value="2D"
                            />
                            <div>2D 디자인</div>
                        </label>
                        <label htmlFor="3d">
                            <input
                                {...register("hasDesign", {
                                    required: true,
                                })}
                                type="radio"
                                id="3d"
                                name="hasDesign"
                                value="3D"
                            />
                            <div>3D 디자인</div>
                        </label>
                        <label htmlFor="diagram">
                            <input
                                {...register("hasDesign", {
                                    required: true,
                                })}
                                type="radio"
                                id="diagram"
                                name="hasDesign"
                                value="도면"
                            />
                            <div>도면</div>
                        </label>
                        <label htmlFor="noDesign">
                            <input
                                {...register("hasDesign", {
                                    required: true,
                                })}
                                type="radio"
                                id="noDesign"
                                name="hasDesign"
                                value="없음"
                            />
                            <div>아니요</div>
                        </label>
                    </div>
                    {errors.hasDesign && <p>필수항목을 입력하세요</p>}
                </Column>
                <Column>
                    <div className="column__head">예산과 일정이 정해져 계신가요?</div>
                    <div className="column__info">
                        <SSelect
                            isValue={Boolean(watchAll.cost)}
                            {...register("cost", {
                                required: true,
                            })}
                        >
                            <option value="">예산을 선택해주세요. *</option>
                            <option value="500만원이하">500만원 이하</option>
                            <option value="2000만원이하">2000만원 이하</option>
                            <option value="5000만원이하">5000만원 이하</option>
                            <option value="1억원이하">1억원 이하</option>
                            <option value="1억원이상">1억원 이상</option>
                            <option value="미정">미정</option>
                        </SSelect>
                        <SSelect
                            isValue={Boolean(watchAll.schedule)}
                            {...register("schedule", {
                                required: true,
                            })}
                        >
                            <option value="">일정을 선택해주세요. *</option>
                            <option value="1개월내">시급해요! (1개월 내 완료)</option>
                            <option value="3개월내">3개월 내 완료</option>
                            <option value="3개월이상">3개월 이상</option>
                        </SSelect>
                    </div>
                    {(errors.schedule || errors.cost) && <p>필수항목을 입력하세요</p>}
                </Column>
                <Column>
                    <div className="column__head">내용을 말씀해 주시겠어요? *</div>
                    <div className="column__info">
                        <MultiColumn>
                            <span className="column__explanation">
                                ◾ 컨텐츠(ex. 캐릭터, 글자 등)와 제작 목적, 설치 현장 등에
                                대해 자세히 기입해주시면 보다 구체적인 상담이 가능합니다.
                            </span>
                            <textarea
                                {...register("description", { required: true })}
                                placeholder="프로젝트 내용을 자세히 기입하세요 *"
                            />
                            <input
                                type="file"
                                name="images"
                                ref={imgRef}
                                hidden={true}
                                onChange={handleFile}
                            />
                            <span className="column__explanation">
                                ◾ 제작에 참고할 디자인, 도면, 이미지 사진 파일을
                                첨부해주세요. (선택)
                            </span>
                            <div
                                className="upload-btn box"
                                onClick={() => imgRef.current.click()}
                            >
                                파일첨부
                            </div>
                            {files.length > 0 && (
                                <>
                                    {files?.map(({ name }, index) => (
                                        <div key={index} className="image-btn box">
                                            <span>{name}</span>
                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                onClick={() => handleImageDelete(index)}
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                        </MultiColumn>
                    </div>
                    {errors.description && <p>필수항목을 입력하세요</p>}
                </Column>
                <div className="btnContainer">
                    <button className="btnItem next">다음</button>
                </div>
            </SForm>
        </>
    );
}

const MultiColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    textarea {
        font-size: 14px;
        width: 100%;
        border-radius: 3px;
        background-color: white;
        border: 1px solid ${(props) => props.theme.borderColor};
        resize: none;
        padding: 10px;
        height: 100%;
        min-height: 230px;
        outline: none;
        font-family: "Pretendard";
        line-height: 1.5rem;
        &::placeholder {
            font-size: 14px;
            @media ${device.tablet} {
                font-size: 12px;
            }
        }
    }
    .column__explanation {
        color: ${(props) => props.theme.darkGrayColor};
        font-size: 13px;
        font-weight: 200;
        word-break: keep-all;
        margin-bottom: 2px;
        width: 100%;
        @media ${device.mobile} {
            font-size: 11px;
            line-height: 16px;
        }
    }
    input[type="text"],
    .box,
    textarea {
        margin-bottom: 5px;
    }
`;

export default ContactInfo;
