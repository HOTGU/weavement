import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { device } from "../device";
import { createContactApi } from "../api";
import Loader from "../Components/Loader";

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
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        reset,
    } = useForm();

    const watchAll = watch();

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

    const onValid = async (data) => {
        data.images = files;
        if (
            !data.step ||
            !data.hasDesign ||
            !data.cost ||
            !data.schedule ||
            !data.description ||
            !data.knowPath ||
            !data.clientName ||
            !data.clientCompany ||
            !data.clientPhone ||
            !data.clientEmail
        ) {
            toast.error("필수항목들을 입력하세요");
            return;
        }
        try {
            setLoading(true);
            await createContactApi(data);
            setLoading(false);
            toast.success(
                `프로젝트 문의가 완료되었습니다\n빠른 시일내에 회신드리겠습니다`
            );
            reset();
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("뭔가 문제가 생겼습니다");
        }
    };

    return (
        // <div className="default-container">
        <div className="default-container">
            <ProcessForm onSubmit={handleSubmit(onValid)}>
                <ProcessHead>
                    <div>프로젝트 의뢰</div>
                    <div>Project Contact</div>
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
                                ◾ 컨텐츠(ex. 캐릭터, 글자 등)와 제작 목적, 설치 현장 등에
                                대해 자세히 기입해주시면 보다 구체적인 상담이 가능합니다.
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
                                            <div key={index} className="image-btn btn">
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
                                    ◾ 사이트에 있는 사례 중 관심있는 사례를 적어주세요.
                                    (선택)
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
                                className="btn"
                                placeholder="ex. 01012345678"
                                {...register("clientPhone", {
                                    onChange: (e) => {
                                        if (isNumber)
                                            setValue("clientPhone", e.target.value);
                                        if (!isNumber)
                                            setValue("clientPhone", watchAll.clientPhone);
                                    },
                                })}
                                onKeyDown={(e) => {
                                    const acceptArr = [
                                        "0",
                                        "1",
                                        "2",
                                        "3",
                                        "4",
                                        "5",
                                        "6",
                                        "7",
                                        "8",
                                        "9",
                                    ];
                                    if (
                                        acceptArr.includes(e.key) ||
                                        e.key === "Backspace"
                                    ) {
                                        setIsNumber(true);
                                    } else {
                                        setIsNumber(false);
                                    }
                                }}
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
                <SubmitBtn disabled={loading}>
                    {loading ? <Loader width="25px" height="25px" /> : "문의하기"}
                </SubmitBtn>
            </ProcessForm>
        </div>
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
    div:first-child {
        font-size: 34px;
        @media ${device.tablet} {
            font-size: 28px;
        }
        @media ${device.mobile} {
            font-size: 24px;
        }
    }
    div:last-child {
        font-size: 25px;
        margin-top: 2px;
        @media ${device.tablet} {
            font-size: 22px;
        }
        @media ${device.mobile} {
            font-size: 18px;
        }
    }
`;

const ProcessForm = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
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
            font-size: 20px;
            margin-bottom: 10px;
            padding: 2px 8px;
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
            width: 40%;
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
`;

const SubmitBtn = styled.button`
    width: 50%;
    height: 80px;
    background-color: ${(props) => props.theme.subAccentColor};
    color: white;
    font-size: 26px;
    cursor: pointer;
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
