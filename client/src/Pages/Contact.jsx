import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

import { device } from "../device";
import { createContactApi } from "../api";
import Loader from "../Components/Loader";
import Metatag from "../Components/Metatag";

function Contact() {
    const imgRef = useRef();
    const stepRef = useRef();
    const hasDesignRef = useRef();
    const costAndScheduleRef = useRef();
    const descriptionRef = useRef();
    const knowPathRef = useRef();
    const clientRef = useRef();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [isNumber, setIsNumber] = useState(false);
    const [accept, setAccept] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        reset,
    } = useForm();

    const watchAll = watch();

    const init = () => {
        reset();
        setFiles([]);
        setImages([]);
        setAccept(false);
    };

    const handleFile = (e) => {
        if (images.length >= 5 || files.length >= 5) {
            toast.error("최대 5장입니다");
            return;
        }
        setFiles((prev) => [...prev, e.target.files[0]]);
        setImages((prev) => [...prev, e.target.files[0]?.name]);
    };

    const handleImageDelete = (index) => {
        const filteredFiles = files.filter((__, i) => i !== index);
        setFiles(filteredFiles);
        const filteredImages = images.filter((__, i) => i !== index);
        setImages(filteredImages);
        imgRef.current.value = "";
    };

    const handleOnlyNumber = (e) => {
        const acceptArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (acceptArr.includes(e.key) || e.key === "Backspace") {
            setIsNumber(true);
        } else {
            setIsNumber(false);
        }
    };

    const onValid = async (data) => {
        data.images = files;
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
                        maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
                        useWebWorker: true, // webworker 사용 여부
                    };
                    const compressedBlob = await imageCompression(files[i], options);
                    const compressedFile = new File(
                        [compressedBlob],
                        `${compressedBlob.name}`,
                        {
                            type: compressedBlob.type,
                        }
                    );
                    fd.append("images", compressedFile);
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
            toast.error("뭔가 문제가 생겼습니다");
        }
        setLoading(false);
    };

    return (
        <>
            <Metatag title="위브먼트 | 문의" />
            <div className="default-container">
                <ProcessForm onSubmit={handleSubmit(onValid)}>
                    <ProcessHead>
                        <div>프로젝트 의뢰</div>
                    </ProcessHead>
                    <Column ref={stepRef}>
                        <div className="column__head">어떤 단계인가요? *</div>
                        <div className="column__info">
                            <label htmlFor="planing">
                                <input
                                    type="radio"
                                    id="planing"
                                    value="기획,예편"
                                    {...register("step")}
                                />
                                <div className="btn">기획 및 예산 편성 단계</div>
                            </label>
                            <label htmlFor="design">
                                <input
                                    type="radio"
                                    id="design"
                                    value="디자인,설계"
                                    {...register("step")}
                                />
                                <div className="btn">디자인 및 설계 단계</div>
                            </label>
                            <label htmlFor="making">
                                <input
                                    type="radio"
                                    id="making"
                                    value="제작"
                                    {...register("step")}
                                />
                                <div className="btn">제작단계</div>
                            </label>
                        </div>
                    </Column>
                    {errors.step && errors.step.message && <>{errors.step.message}</>}
                    <Column ref={hasDesignRef}>
                        <div className="column__head">
                            디자인이나 설계 도면이 준비되셨나요? *
                        </div>
                        <div className="column__info">
                            <label htmlFor="2d">
                                <input
                                    {...register("hasDesign")}
                                    type="radio"
                                    id="2d"
                                    name="hasDesign"
                                    value="2D"
                                />
                                <div className="btn">2D 디자인</div>
                            </label>
                            <label htmlFor="3d">
                                <input
                                    {...register("hasDesign")}
                                    type="radio"
                                    id="3d"
                                    name="hasDesign"
                                    value="3D"
                                />
                                <div className="btn">3D 디자인</div>
                            </label>
                            <label htmlFor="diagram">
                                <input
                                    {...register("hasDesign")}
                                    type="radio"
                                    id="diagram"
                                    name="hasDesign"
                                    value="도면"
                                />
                                <div className="btn">도면</div>
                            </label>
                            <label htmlFor="noDesign">
                                <input
                                    {...register("hasDesign")}
                                    type="radio"
                                    id="noDesign"
                                    name="hasDesign"
                                    value="없음"
                                />
                                <div className="btn">아니요</div>
                            </label>
                        </div>
                    </Column>
                    <Column ref={costAndScheduleRef}>
                        <div className="column__head">예산과 일정이 정해져 계신가요?</div>
                        <div className="column__info">
                            <SSelect
                                className="btn"
                                isValue={Boolean(watchAll.cost)}
                                {...register("cost")}
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
                                className="btn"
                                isValue={Boolean(watchAll.schedule)}
                                {...register("schedule")}
                            >
                                <option value="">일정을 선택해주세요. *</option>
                                <option value="1개월내">시급해요! (1개월 내 완료)</option>
                                <option value="3개월내">3개월 내 완료</option>
                                <option value="3개월이상">3개월 이상</option>
                            </SSelect>
                        </div>
                    </Column>
                    <Column ref={descriptionRef}>
                        <div className="column__head">내용을 말씀해 주시겠어요? *</div>
                        <div className="column__info">
                            <MultiColumn>
                                <span className="column__explanation">
                                    ◾ 컨텐츠(ex. 캐릭터, 글자 등)와 제작 목적, 설치 현장
                                    등에 대해 자세히 기입해주시면 보다 구체적인 상담이
                                    가능합니다.
                                </span>
                                <textarea
                                    {...register("description")}
                                    placeholder="프로젝트 내용을 자세히 기입하세요 *"
                                />
                                <input
                                    type="file"
                                    name="images"
                                    ref={imgRef}
                                    hidden={true}
                                    onChange={handleFile}
                                />

                                <MultiColumnItem>
                                    <span className="column__explanation">
                                        ◾ 제작에 참고할 디자인, 도면, 이미지 사진 파일을
                                        첨부해주세요. (선택)
                                    </span>
                                    <div
                                        className="upload-btn btn"
                                        onClick={() => imgRef.current.click()}
                                    >
                                        파일첨부(선택)
                                    </div>
                                    {images && (
                                        <>
                                            {images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="image-btn btn"
                                                >
                                                    <span>{image}</span>
                                                    <FontAwesomeIcon
                                                        icon={faCircleXmark}
                                                        onClick={() =>
                                                            handleImageDelete(index)
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </MultiColumnItem>
                                <MultiColumnItem>
                                    <span className="column__explanation">
                                        ◾ 사이트에 있는 사례 중 관심있는 사례를
                                        적어주세요. (선택)
                                    </span>
                                    <input
                                        className="btn"
                                        {...register("like")}
                                        placeholder="ex. 평창조형물"
                                    />
                                </MultiColumnItem>
                            </MultiColumn>
                        </div>
                    </Column>
                    <Column ref={knowPathRef}>
                        <div className="column__head">
                            위브먼트를 알게 된 경로를 선택해주세요. *
                        </div>
                        <div className="column__info">
                            <label htmlFor="search">
                                <input
                                    {...register("knowPath")}
                                    type="radio"
                                    id="search"
                                    name="knowPath"
                                    value="검색"
                                />
                                <div className="btn">검색 (네이버, 구글, 다음)</div>
                            </label>
                            <label htmlFor="sns">
                                <input
                                    {...register("knowPath")}
                                    type="radio"
                                    id="sns"
                                    name="knowPath"
                                    value="SNS"
                                />
                                <div className="btn">SNS (인스타그램, 페이스북)</div>
                            </label>
                            <label htmlFor="myBlog">
                                <input
                                    {...register("knowPath")}
                                    type="radio"
                                    id="myBlog"
                                    name="knowPath"
                                    value="위브먼트블로그"
                                />
                                <div className="btn">'위브먼트' 네이버블로그</div>
                            </label>
                            <label htmlFor="otherBlog">
                                <input
                                    {...register("knowPath")}
                                    type="radio"
                                    id="otherBlog"
                                    name="knowPath"
                                    value="네이버블로그"
                                />
                                <div className="btn">
                                    네이버 블로그('위브먼트'공식 블로그 제외)
                                </div>
                            </label>
                            <label htmlFor="friend">
                                <input
                                    {...register("knowPath")}
                                    type="radio"
                                    id="friend"
                                    name="knowPath"
                                    value="지인추천"
                                />
                                <div className="btn">지인추천</div>
                            </label>
                        </div>
                    </Column>
                    <Column ref={clientRef}>
                        <div className="column__head">
                            감사합니다! <br />
                            기입된 정보로 회신드리겠습니다
                        </div>
                        <div className="column__info">
                            <InfoColumn>
                                <span>기업(기관)명 *</span>
                                <input
                                    className="btn"
                                    placeholder="ex. 위브먼트"
                                    {...register("clientCompany")}
                                />
                            </InfoColumn>
                            <InfoColumn>
                                <span>담당자 성함 *</span>
                                <input
                                    className="btn"
                                    placeholder="ex. 홍길동"
                                    {...register("clientName")}
                                />
                            </InfoColumn>
                            <InfoColumn>
                                <span>직책</span>
                                <input
                                    className="btn"
                                    placeholder="ex. 과장"
                                    {...register("clientPosition")}
                                />
                            </InfoColumn>
                            <InfoColumn>
                                <span>연락처 *</span>
                                <input
                                    className="btn phone-btn"
                                    placeholder="010"
                                    {...register("clientStartPhone", {
                                        onChange: (e) => {
                                            if (isNumber)
                                                setValue(
                                                    "clientStartPhone",
                                                    e.target.value
                                                );
                                            if (!isNumber || e.target.value.length > 3)
                                                setValue(
                                                    "clientStartPhone",
                                                    watchAll.clientStartPhone
                                                );
                                        },
                                    })}
                                    onKeyDown={handleOnlyNumber}
                                />
                                <div className="rowLine"></div>
                                <input
                                    className="btn phone-btn"
                                    placeholder="1234"
                                    {...register("clientMiddlePhone", {
                                        onChange: (e) => {
                                            if (isNumber)
                                                setValue(
                                                    "clientMiddlePhone",
                                                    e.target.value
                                                );
                                            if (!isNumber || e.target.value.length > 4)
                                                setValue(
                                                    "clientMiddlePhone",
                                                    watchAll.clientMiddlePhone
                                                );
                                        },
                                    })}
                                    onKeyDown={handleOnlyNumber}
                                />
                                <div className="rowLine"></div>

                                <input
                                    className="btn phone-btn"
                                    placeholder="5678"
                                    {...register("clientEndPhone", {
                                        onChange: (e) => {
                                            if (isNumber)
                                                setValue(
                                                    "clientEndPhone",
                                                    e.target.value
                                                );
                                            if (!isNumber || e.target.value.length > 4)
                                                setValue(
                                                    "clientEndPhone",
                                                    watchAll.clientEndPhone
                                                );
                                        },
                                    })}
                                    onKeyDown={handleOnlyNumber}
                                />
                            </InfoColumn>
                            <InfoColumn>
                                <span>이메일 *</span>
                                <input
                                    className="btn"
                                    placeholder="ex. example@naver.com"
                                    {...register("clientEmail")}
                                />
                            </InfoColumn>
                            <InfoColumn>
                                <span>홈페이지 주소</span>
                                <input
                                    className="btn"
                                    placeholder="ex. weavement.co.kr"
                                    {...register("clientHomepage")}
                                />
                            </InfoColumn>
                            <InfoColumn>
                                <span>기타 요청사항</span>
                                <input
                                    className="btn"
                                    placeholder="ex. 연락처 내 개인 회선 번호는 '04'번입니다"
                                    {...register("clientRequest")}
                                />
                            </InfoColumn>
                        </div>
                    </Column>
                    <div className="accept">
                        <div className="accept__head">개인정보 수집 동의</div>
                        <div className="accept__info">
                            <div className="acceptText">
                                -수집항목: 필수(단계,예산 및
                                일정,회사명,성명,이메일,연락처) /
                                선택(첨부파일,직책,홈페이지)
                            </div>
                            <div className="acceptText">
                                수집된 정보는 문의 접수 및 회신에 이용되며 전자상거래 등
                                관련 법령에 따라 6개월간 보관됩니다.
                                <br /> 이용자는 본 동의를 거부할 수 있으며, 미동의 시 문의
                                접수가 불가능합니다.
                            </div>
                            <label>
                                <input
                                    type="checkbox"
                                    onClick={(e) => {
                                        setAccept(!accept);
                                    }}
                                />
                                <span className="acceptText">동의합니다</span>
                            </label>
                        </div>
                    </div>
                    <SubmitBtn
                        isDisabled={loading || !accept}
                        disabled={loading || !accept}
                    >
                        {loading ? <Loader width="25px" height="25px" /> : "문의하기"}
                    </SubmitBtn>
                </ProcessForm>
            </div>
        </>
    );
}

export default Contact;

const ProcessHead = styled.div`
    padding: 60px 0;
    color: ${(props) => props.theme.textColor};
    font-weight: 700;
    @media ${device.tablet} {
        padding: 40px 0;
    }
    @media ${device.mobile} {
        padding: 20px 0;
    }
    div {
        font-size: 34px;
        @media ${device.tablet} {
            font-size: 28px;
        }
        @media ${device.mobile} {
            font-size: 24px;
        }
    }
`;

const ProcessForm = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    .accept {
        display: flex;
        margin-bottom: 80px;
        @media ${device.laptop} {
            flex-direction: column;
            margin-bottom: 60px;
        }
        @media ${device.tablet} {
            margin-bottom: 40px;
        }
        @media ${device.mobile} {
            margin-bottom: 30px;
        }
        &__head {
            color: ${(props) => props.theme.accentColor};
            font-size: 18px;
            font-weight: 500;
            width: 40%;
            @media ${device.laptop} {
                width: 100%;
                margin-bottom: 16px;
                font-size: 16px;
            }
            @media ${device.tablet} {
                margin-bottom: 14px;
                font-size: 14px;
            }
            @media ${device.mobile} {
                margin-bottom: 12px;
                font-size: 12px;
            }
        }
        &__info {
            width: 60%;
            display: flex;
            flex-direction: column;
            gap: 12px;
            @media ${device.laptop} {
                width: 100%;
                gap: 6px;
            }
            @media ${device.tablet} {
                gap: 4px;
            }
            @media ${device.mobile} {
                gap: 2px;
            }
            label {
                display: flex;
                align-items: center;
                margin-top: 5px;
                span {
                    background-color: ${(props) => props.theme.bgColor};
                    border: 1px solid ${(props) => props.theme.borderColor};
                    border-radius: 5px;
                    transition: all 0.2s ease-in-out;
                    padding: 5px 8px;
                    cursor: pointer;
                }
            }
            input {
                display: none;
            }
            input:checked + span {
                background-color: ${(props) => props.theme.accentColor};
                color: white;
            }
            .acceptText {
                font-size: 16px;
                color: ${(props) => props.theme.gray};
                line-height: 20px;
                @media ${device.laptop} {
                    font-size: 14px;
                }
                @media ${device.tablet} {
                    font-size: 12px;
                }
                @media ${device.mobile} {
                    line-height: 14px;
                    font-size: 10px;
                }
            }
        }
    }
`;

const Column = styled.div`
    margin-bottom: 80px;
    display: flex;
    width: 100%;
    align-items: flex-start;
    color: ${(props) => props.theme.darkGrayColor};
    @media ${device.laptop} {
        flex-direction: column;
        margin-bottom: 60px;
    }
    @media ${device.tablet} {
        margin-bottom: 40px;
    }
    @media ${device.mobile} {
        margin-bottom: 30px;
    }
    .column__head {
        width: 40%;
        border-left: 4px solid ${(props) => props.theme.accentColor};
        padding: 4px 12px;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        @media ${device.laptop} {
            width: 100%;
            margin-bottom: 20px;
        }
        @media ${device.tablet} {
            font-size: 16px;
            margin-bottom: 8px;
            padding: 1px 4px;
            border-left: 2px solid ${(props) => props.theme.accentColor};
            line-height: 20px;
        }
    }

    .column__info {
        width: 60%;
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        @media ${device.laptop} {
            width: 100%;
        }
        @media ${device.tablet} {
            width: 100%;
            gap: 10px;
        }
        label {
            input[type="radio"]:checked {
                + div {
                    background-color: ${(props) => props.theme.accentColor};
                    color: white;
                }
            }
            input[type="radio"] {
                display: none;
            }
        }
    }
`;

const SSelect = styled.select`
    outline: none;
    background-color: ${(props) => (props.isValue ? props.theme.accentColor : "white")};
    border: 1px solid ${(props) => props.theme.borderColor};
    color: ${(props) => (props.isValue ? "white" : props.theme.textColor)};
    flex: 1;
    @media ${device.mobile} {
        flex: none;
        width: 100%;
    }
    option {
        padding: 5px 0;
        background-color: white;
        color: ${(props) => props.theme.textColor};
    }
`;

const MultiColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    textarea {
        width: 100%;
        border-radius: 3px;
        background-color: white;
        border: 1px solid ${(props) => props.theme.borderColor};
        resize: none;
        font-size: 18px;
        padding: 20px;
        height: 100%;
        min-height: 230px;
        outline: none;
        transition: all 0.2s ease-in-out;
        font-family: "Pretendard";
        line-height: 1.5rem;
        @media ${device.tablet} {
            padding: 14px;
            font-size: 16px;
        }
        @media ${device.mobile} {
            padding: 10px;
            font-size: 14px;
        }
        &:focus {
            border: 2px solid ${(props) => props.theme.accentColor};
        }
        &::placeholder {
            font-size: 18px;
            @media ${device.tablet} {
                font-size: 16px;
            }
            @media ${device.mobile} {
                font-size: 14px;
            }
        }
    }
    .column__explanation {
        color: ${(props) => props.theme.darkGrayColor};
        word-break: keep-all;
        font-weight: 400;
        margin-bottom: 5px;
        width: 100%;
        @media ${device.mobile} {
            font-size: 11px;
            line-height: 16px;
        }
    }
`;

const MultiColumnItem = styled.div`
    width: 100%;
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    .upload-btn {
        border: 1px solid ${(props) => props.theme.accentColor};
        color: ${(props) => props.theme.accentColor};
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        &:hover {
            background-color: ${(props) => props.theme.accentColor};
            color: white;
        }
    }
    .image-btn {
        margin-left: 10px;
        span {
            margin-right: 4px;
        }
        svg {
            color: ${(props) => props.theme.accentColor};
            cursor: pointer;
        }
    }
`;

const InfoColumn = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    span {
        width: 30%;
        margin-right: 20px;
        font-size: 20px;
        min-width: 100px;
        @media ${device.tablet} {
            font-size: 16px;
        }
        @media ${device.mobile} {
            width: 35%;
        }
    }
    input {
        width: 65%;
        &::placeholder {
            font-family: "Pretendard";
        }
        @media ${device.mobile} {
            width: 60%;
        }
    }
    .phone-btn {
        width: 80px;
        @media ${device.mobile} {
            width: 50px;
        }
    }
    .rowLine {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 15px;
        height: 1px;
        background-color: black;
        margin: 0 10px;
        @media ${device.mobile} {
            width: 8px;
            margin: 0 3px;
        }
    }
`;

const SubmitBtn = styled.button`
    width: 50%;
    height: 80px;
    background-color: ${(props) =>
        props.isDisabled ? props.theme.hoverColor : props.theme.subAccentColor};
    color: white;
    font-size: 26px;
    cursor: ${(props) => (props.isDisabled ? "not-allowed" : "cursor")};
    font-weight: 700;
    margin-bottom: 60px;
    transition: all 0.2s ease-in-out;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    @media ${device.tablet} {
        width: 100%;
        height: 60px;
        font-size: 22px;
    }
    @media ${device.mobile} {
        width: 100%;
        height: 50px;
        font-size: 20px;
    }
`;
