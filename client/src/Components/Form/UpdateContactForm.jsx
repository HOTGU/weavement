import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useResetRecoilState } from "recoil";
import { contactListSelector } from "../../atoms/contact";
import { updateContactApi } from "../../api";
import Button from "../Button";
import Loader from "../Loader";

function UpdateContactForm({ data, setModal, id }) {
    const reload = useResetRecoilState(contactListSelector);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: useMemo(() => {
            return data;
        }, [data]),
    });

    const watchAll = watch();

    const onValid = async (formData) => {
        setLoading(true);
        try {
            await updateContactApi(id, formData);
            setModal(false);
            reload();
            toast.success("수정되었습니다.");
        } catch (error) {
            toast.error("수정실패했습니다.");
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        reset(data);
    }, [id, data, reset]);

    return (
        <SForm onSubmit={handleSubmit(onValid)}>
            <div className="form__head">'{data.clientCompany}' 프로젝트</div>

            <div className="form__column first__column">
                <div className="column__head">상태변경</div>
                <div className="column__input">
                    <label>
                        <input {...register("state")} type="radio" value="문의" />
                        문의
                    </label>
                    <label>
                        <input {...register("state")} type="radio" value="상담" />
                        상담
                    </label>
                    <label>
                        <input {...register("state")} type="radio" value="계약" />
                        계약
                    </label>
                    <label>
                        <input {...register("state")} type="radio" value="완료" />
                        완료
                    </label>
                </div>
            </div>
            {watchAll.state === "문의" && (
                <>
                    <div className="form__column">
                        <div className="column__head">단계</div>
                        <div className="column__input">
                            <label>
                                <input
                                    type="radio"
                                    {...register("step")}
                                    value="기획,예편"
                                />
                                기획,예편
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("step")}
                                    value="디자인,설계"
                                />
                                디자인,설계
                            </label>
                            <label>
                                <input type="radio" {...register("step")} value="제작" />
                                제작
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("step")}
                                    value="미확인"
                                />
                                미확인
                            </label>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">디자인,도면</div>
                        <div className="column__input">
                            <label>
                                <input
                                    type="radio"
                                    {...register("hasDesign")}
                                    value="2D"
                                />
                                2D
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("hasDesign")}
                                    value="3D"
                                />
                                3D
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("hasDesign")}
                                    value="도면"
                                />
                                도면
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("hasDesign")}
                                    value="없음"
                                />
                                없음
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("hasDesign")}
                                    value="미확인"
                                />
                                미확인
                            </label>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">예산</div>
                        <div className="column__input">
                            <select {...register("cost")}>
                                <option value="">예산을 선택해주세요.</option>
                                <option value="500만원이하">500만원 이하</option>
                                <option value="2000만원이하">2000만원 이하</option>
                                <option value="5000만원이하">5000만원 이하</option>
                                <option value="1억원이하">1억원 이하</option>
                                <option value="1억원이상">1억원 이상</option>
                                <option value="미정">미정</option>
                            </select>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">일정</div>
                        <div className="column__input">
                            <select {...register("schedule")}>
                                <option value="">일정을 선택해주세요. *</option>
                                <option value="1개월내">시급해요! (1개월 내 완료)</option>
                                <option value="3개월내">3개월 내 완료</option>
                                <option value="3개월이상">3개월 이상</option>
                            </select>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">문의내용</div>
                        <div className="column__input">
                            <div className="column__input">
                                <textarea
                                    placeholder="상담내용"
                                    {...register("description")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">알게된경로</div>
                        <div className="column__input">
                            <div className="column__input">
                                <select {...register("knowPath")}>
                                    <option value="">경로를 선택해주세요.</option>
                                    <option value="검색">검색(네이버, 구글, 다음)</option>
                                    <option value="SNS">
                                        SNS (인스타그램, 페이스북)
                                    </option>
                                    <option value="위브먼트블로그">
                                        '위브먼트'블로그
                                    </option>
                                    <option value="네이버블로그">
                                        네이버 블로그 (공식블로그 제외)
                                    </option>
                                    <option value="1억원이상">지인추천</option>
                                    <option value="알수없음">알 수 없음</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">회사명</div>
                        <div className="column__input">
                            <input {...register("clientCompany")} />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">담당자</div>
                        <div className="column__input">
                            <input {...register("clientName")} />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">직책</div>
                        <div className="column__input">
                            <input {...register("clientPosition")} />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">연락처</div>
                        <div className="column__input">
                            <input {...register("clientStartPhone")} />
                            <input {...register("clientMiddlePhone")} />
                            <input {...register("clientEndPhone")} />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">이메일</div>
                        <div className="column__input">
                            <input {...register("clientEmail")} />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">홈페이지</div>
                        <div className="column__input">
                            <input {...register("clientHomepage")} />
                        </div>
                    </div>
                </>
            )}
            {watchAll.state === "상담" && (
                <>
                    <div className="form__column">
                        <div className="column__head">PM</div>
                        <div className="column__input">
                            <input {...register("pm")} placeholder="이름" type="text" />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">소재</div>
                        <div className="column__input">
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="FRP"
                                />
                                FRP
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="스티로폼"
                                />
                                스티로폼
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="목재"
                                />
                                목재
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="금속"
                                />
                                금속
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="3D프린팅"
                                />
                                3D프린팅
                            </label>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head"></div>
                        <div className="column__input">
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="복합소재"
                                />
                                복합소재
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="미정"
                                />
                                미정
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="기타"
                                />
                                기타
                            </label>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">콘텐츠</div>
                        <div className="column__input">
                            <input
                                {...register("content")}
                                placeholder="콘텐츠"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">크기</div>
                        <div className="column__input">
                            <input {...register("size")} placeholder="크기" type="text" />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">일정</div>
                        <div className="column__input">
                            <label>
                                <input
                                    type="radio"
                                    {...register("due")}
                                    value="2주이내"
                                />
                                2주이내
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("due")}
                                    value="2주~4주"
                                />
                                2주~4주
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("due")}
                                    value="1달~3달"
                                />
                                1달~3달
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    {...register("due")}
                                    value="3달이상"
                                />
                                3달이상
                            </label>
                        </div>
                    </div>
                </>
            )}
            {watchAll.state === "계약" && (
                <>
                    <div className="form__column">
                        <div className="column__head">PM</div>
                        <div className="column__input">
                            <input {...register("pm")} placeholder="이름" type="text" />
                        </div>
                    </div>

                    <div className="form__column">
                        <div className="column__head">소재</div>
                        <div className="column__input">
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="FRP"
                                />
                                FRP
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="스티로폼"
                                />
                                스티로폼
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="목재"
                                />
                                목재
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="금속"
                                />
                                금속
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="3D프린팅"
                                />
                                3D프린팅
                            </label>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head"></div>
                        <div className="column__input">
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="복합소재"
                                />
                                복합소재
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="미정"
                                />
                                미정
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register("meterial")}
                                    value="기타"
                                />
                                기타
                            </label>
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">콘텐츠</div>
                        <div className="column__input">
                            <input
                                {...register("content")}
                                placeholder="콘텐츠"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">협력사</div>
                        <div className="column__input">
                            <input
                                {...register("orderCompany")}
                                placeholder="회사명"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="form__column">
                        <div className="column__head">납기일</div>
                        <div className="column__input">
                            <input {...register("deadline")} type="date" />
                        </div>
                    </div>
                </>
            )}
            <Button onClick={handleSubmit(onValid)} disabled={loading}>
                {loading ? <Loader /> : "수정"}
            </Button>
        </SForm>
    );
}

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    min-height: 300px;
    width: 600px;
    textarea,
    input,
    select {
        border: 1px solid ${(props) => props.theme.borderColor};
        padding: 6px 10px;
        border-radius: 5px;
        width: 100%;
    }
    textarea {
        resize: none;
        outline: none;
        height: 150px;
    }
    label {
        display: flex;
        align-items: center;
    }
    input,
    select {
        font-size: 14px;
    }
    input[type="submit"] {
        cursor: pointer;
        background-color: ${(props) => props.theme.subAccentColor};
        color: white;
        border: none;
        margin-top: auto;
    }
    input[type="radio"],
    input[type="checkbox"] {
        width: 10px;
    }
    .form__head {
        text-align: center;
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 10px;
    }
    .form__column {
        display: flex;
        align-items: center;
        &:first-child {
            color: red;
        }
    }
    .first__column {
        border-bottom: 1px solid ${(props) => props.theme.borderColor};
        padding-bottom: 20px;
    }
    .column__head {
        flex: 3;
        font-weight: 300;
        font-size: 18px;
    }
    .column__input {
        flex: 7;
        display: flex;
        gap: 10px;
    }
`;

export default UpdateContactForm;
