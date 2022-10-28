import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

import { contactFormData } from "../../atoms/contactFormData";
import { Column, SForm } from "./Styles";
import { useEffect } from "react";

function ContactClient({ nextStep, previousStep }) {
    const [formData, setFormData] = useRecoilState(contactFormData);
    const [isNumber, setIsNumber] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        mode: "all",
        defaultValues: formData,
    });

    const watchAll = watch();
    const {
        clientCompany,
        clientName,
        clientPosition,
        clientStartPhone,
        clientMiddlePhone,
        clientEndPhone,
        clientEmail,
        clientHomepage,
        clientRequest,
    } = watchAll;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleOnlyNumber = (e) => {
        const acceptArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (acceptArr.includes(e.key) || e.key === "Backspace") {
            setIsNumber(true);
        } else {
            setIsNumber(false);
        }
    };

    const onSubmit = (data) => {
        setFormData(data);
        nextStep();
    };

    return (
        <SForm onSubmit={handleSubmit(onSubmit)}>
            <Column>
                <div className="column__head">기업(기관)명 *</div>
                <div className="column__info">
                    <input
                        className="btn"
                        placeholder="ex. 위브먼트"
                        {...register("clientCompany", { required: true })}
                    />
                </div>
                {errors.clientCompany && <p>필수항목을 입력하세요</p>}
            </Column>
            <Column>
                <div className="column__head">성함 *</div>
                <div className="column__info">
                    <input
                        className="btn"
                        placeholder="ex. 홍길동"
                        {...register("clientName", { required: true })}
                    />
                </div>
                {errors.clientName && <p>필수항목을 입력하세요</p>}
            </Column>
            <Column>
                <div className="column__head">직책</div>
                <div className="column__info">
                    <input
                        className="btn"
                        placeholder="ex. 과장"
                        {...register("clientPosition")}
                    />
                </div>
            </Column>
            <Column>
                <div className="column__head">연락처 *</div>
                <div className="column__info">
                    <div className="phoneContainer">
                        <input
                            className="phone-btn"
                            placeholder="010"
                            {...register("clientStartPhone", {
                                required: true,
                                onChange: (e) => {
                                    if (isNumber)
                                        setValue("clientStartPhone", e.target.value);
                                    if (!isNumber || e.target.value.length > 3)
                                        setValue(
                                            "clientStartPhone",
                                            watchAll.clientStartPhone
                                        );
                                },
                            })}
                            onKeyDown={handleOnlyNumber}
                        />
                        <input
                            className="phone-btn"
                            placeholder="1234"
                            {...register("clientMiddlePhone", {
                                required: true,
                                onChange: (e) => {
                                    if (isNumber)
                                        setValue("clientMiddlePhone", e.target.value);
                                    if (!isNumber || e.target.value.length > 4)
                                        setValue(
                                            "clientMiddlePhone",
                                            watchAll.clientMiddlePhone
                                        );
                                },
                            })}
                            onKeyDown={handleOnlyNumber}
                        />
                        <input
                            className="phone-btn"
                            placeholder="5678"
                            {...register("clientEndPhone", {
                                required: true,
                                onChange: (e) => {
                                    if (isNumber)
                                        setValue("clientEndPhone", e.target.value);
                                    if (!isNumber || e.target.value.length > 4)
                                        setValue(
                                            "clientEndPhone",
                                            watchAll.clientEndPhone
                                        );
                                },
                            })}
                            onKeyDown={handleOnlyNumber}
                        />
                    </div>
                </div>
                {(errors.clientEndPhone ||
                    errors.clientMiddlePhone ||
                    errors.clientStartPhone) && <p>필수항목을 입력하세요</p>}
            </Column>
            <Column>
                <div className="column__head">이메일 *</div>
                <div className="column__info">
                    <input
                        className="btn"
                        placeholder="ex. example@naver.com"
                        {...register("clientEmail", { required: true })}
                    />
                </div>
                {errors.clientEmail && <p>필수항목을 입력하세요</p>}
            </Column>
            <Column>
                <div className="column__head">홈페이지주소</div>
                <div className="column__info">
                    <input
                        className="btn"
                        placeholder="ex. weavement.co.kr"
                        {...register("clientHomepage")}
                    />
                </div>
            </Column>
            <Column>
                <div className="column__head">기타 요청사항</div>
                <div className="column__info">
                    <input
                        className="btn"
                        placeholder="ex. 연락처 내 개인 회선 번호는 '04'번입니다"
                        {...register("clientRequest")}
                    />
                </div>
            </Column>
            <div className="btnContainer">
                <div
                    className="btnItem prev"
                    onClick={() => {
                        setFormData((prev) => {
                            return {
                                ...prev,
                                clientCompany,
                                clientName,
                                clientPosition,
                                clientStartPhone,
                                clientMiddlePhone,
                                clientEndPhone,
                                clientEmail,
                                clientHomepage,
                                clientRequest,
                            };
                        });
                        previousStep();
                    }}
                >
                    이전
                </div>
                <button className="btnItem next">다음</button>
            </div>
        </SForm>
    );
}

export default ContactClient;
