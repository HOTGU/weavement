import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useResetRecoilState } from "recoil";
import { contactListSelector } from "../../atoms/contact";
import { updateContactApi } from "../../api";
import Loader from "../Loader";
import Button from "../Button";

function UpdateContactForm({ data, setModal }) {
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
            await updateContactApi(data._id, formData);
            setModal(false);
            reload();
            toast.success("μμ  μ±κ³΅ π");
        } catch (error) {
            toast.error("μμ  μ€ν¨ π€‘");
        }
        setLoading(false);
    };

    useEffect(() => {
        reset(data);
    }, [data, reset]);

    return (
        <>
            <SForm onSubmit={handleSubmit(onValid)}>
                <div className="form__head">'{data.clientCompany}' νλ‘μ νΈ</div>

                <div className="form__column first__column">
                    <div className="column__head">μνλ³κ²½</div>
                    <div className="column__input">
                        <label>
                            <input {...register("state")} type="radio" value="λ¬Έμ" />
                            <div>λ¬Έμ</div>
                        </label>
                        <label>
                            <input {...register("state")} type="radio" value="μλ΄" />
                            <div>μλ΄</div>
                        </label>
                        <label>
                            <input {...register("state")} type="radio" value="κ³μ½" />
                            <div>κ³μ½</div>
                        </label>
                        <label>
                            <input {...register("state")} type="radio" value="μλ£" />
                            <div>μλ£</div>
                        </label>
                        <label>
                            <input {...register("state")} type="radio" value="λΆλ°" />
                            <div>λΆλ°</div>
                        </label>
                    </div>
                </div>
                {watchAll.state === "λ¬Έμ" && (
                    <>
                        <div className="form__column">
                            <div className="column__head">λ¨κ³</div>
                            <div className="column__input">
                                <label>
                                    <input
                                        type="radio"
                                        {...register("step")}
                                        value="κΈ°ν,μνΈ"
                                    />
                                    <div>κΈ°ν,μνΈ</div>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register("step")}
                                        value="λμμΈ,μ€κ³"
                                    />
                                    <div>λμμΈ,μ€κ³</div>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register("step")}
                                        value="μ μ"
                                    />
                                    <div>μ μ</div>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register("step")}
                                        value="λ―ΈνμΈ"
                                    />
                                    <div>λ―ΈνμΈ</div>
                                </label>
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">λμμΈ,λλ©΄</div>
                            <div className="column__input">
                                <label>
                                    <input
                                        type="radio"
                                        {...register("hasDesign")}
                                        value="2D"
                                    />
                                    <div>2D</div>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register("hasDesign")}
                                        value="3D"
                                    />
                                    <div>3D</div>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register("hasDesign")}
                                        value="λλ©΄"
                                    />
                                    <div>λλ©΄</div>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register("hasDesign")}
                                        value="μμ"
                                    />
                                    <div>μμ</div>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register("hasDesign")}
                                        value="λ―ΈνμΈ"
                                    />
                                    <div>λ―ΈνμΈ</div>
                                </label>
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">μμ°</div>
                            <div className="column__input">
                                <select {...register("cost")}>
                                    <option value="">μμ°μ μ νν΄μ£ΌμΈμ.</option>
                                    <option value="500λ§μμ΄ν">500λ§μ μ΄ν</option>
                                    <option value="2000λ§μμ΄ν">2000λ§μ μ΄ν</option>
                                    <option value="5000λ§μμ΄ν">5000λ§μ μ΄ν</option>
                                    <option value="1μ΅μμ΄ν">1μ΅μ μ΄ν</option>
                                    <option value="1μ΅μμ΄μ">1μ΅μ μ΄μ</option>
                                    <option value="λ―Έμ ">λ―Έμ </option>
                                </select>
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">μΌμ </div>
                            <div className="column__input">
                                <select {...register("schedule")}>
                                    <option value="">μΌμ μ μ νν΄μ£ΌμΈμ.</option>
                                    <option value="1κ°μλ΄">
                                        μκΈν΄μ! (1κ°μ λ΄ μλ£)
                                    </option>
                                    <option value="3κ°μλ΄">3κ°μ λ΄ μλ£</option>
                                    <option value="3κ°μμ΄μ">3κ°μ μ΄μ</option>
                                </select>
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">λ¬Έμλ΄μ©</div>
                            <div className="column__input">
                                <div className="column__input">
                                    <textarea
                                        placeholder="μλ΄λ΄μ©"
                                        {...register("description")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">μκ²λκ²½λ‘</div>
                            <div className="column__input">
                                <div className="column__input">
                                    <select {...register("knowPath")}>
                                        <option value="">κ²½λ‘λ₯Ό μ νν΄μ£ΌμΈμ.</option>
                                        <option value="κ²μ">κ²μ</option>
                                        <option value="SNS">SNS</option>
                                        <option value="μ§μΈμΆμ²">μ§μΈμΆμ²</option>
                                        <option value="κΈ°μ‘΄κ³ κ°">κΈ°μ‘΄κ³ κ°</option>
                                        <option value="μμμμ">μ μ μμ</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {(watchAll.knowPath === "κ²μ" ||
                            watchAll.knowPath === "SNS") && (
                            <div className="form__column">
                                <div className="column__head">μκ²λνλ«νΌ</div>
                                <div className="column__input">
                                    <div className="column__input">
                                        <select {...register("knowPlatform")}>
                                            <option value="">
                                                μκ²λνλ«νΌμ μ νν΄μ£ΌμΈμ.
                                            </option>
                                            {watchAll.knowPath === "κ²μ" && (
                                                <>
                                                    <option value="λ€μ΄λ²">λ€μ΄λ²</option>
                                                    <option value="κ΅¬κΈ">κ΅¬κΈ</option>
                                                    <option value="κΈ°ν">κΈ°ν</option>
                                                </>
                                            )}
                                            {watchAll.knowPath === "SNS" && (
                                                <>
                                                    <option value="μΈμ€νκ·Έλ¨">
                                                        μΈμ€νκ·Έλ¨
                                                    </option>
                                                    <option value="νμ΄μ€λΆ">
                                                        νμ΄μ€λΆ
                                                    </option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="form__column">
                            <div className="column__head">μ μκ²½λ‘</div>
                            <div className="column__input">
                                <div className="column__input">
                                    <select {...register("contactPath")}>
                                        <option value="">μ μκ²½λ‘λ₯Ό μ νν΄μ£ΌμΈμ.</option>
                                        <option value="μ ν">μ ν</option>
                                        <option value="λ¬Έμ">λ¬Έμ</option>
                                        <option value="μ΄λ©μΌ">μ΄λ©μΌ</option>
                                        <option value="μΉ΄μΉ΄μ€ν‘">μΉ΄μΉ΄μ€ν‘</option>
                                        <option value="ννμ΄μ§">ννμ΄μ§</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">νμ¬λͺ</div>
                            <div className="column__input">
                                <input {...register("clientCompany")} />
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">λ΄λΉμ</div>
                            <div className="column__input">
                                <input {...register("clientName")} />
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">μ§μ±</div>
                            <div className="column__input">
                                <input {...register("clientPosition")} />
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">μ°λ½μ²</div>
                            <div className="column__input">
                                <input {...register("clientStartPhone")} />
                                <input {...register("clientMiddlePhone")} />
                                <input {...register("clientEndPhone")} />
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">μ΄λ©μΌ</div>
                            <div className="column__input">
                                <input {...register("clientEmail")} />
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">ννμ΄μ§</div>
                            <div className="column__input">
                                <input {...register("clientHomepage")} />
                            </div>
                        </div>
                    </>
                )}
                {watchAll.state === "μλ΄" && (
                    <>
                        <div className="form__column">
                            <div className="column__head">PM</div>
                            <div className="column__input">
                                <input
                                    {...register("pm")}
                                    placeholder="μ΄λ¦"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">μμ¬</div>
                            <div className="column__input">
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="FRP"
                                    />
                                    <div>FRP</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="μ€ν°λ‘νΌ"
                                    />
                                    <div>μ€ν°λ‘νΌ</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="λͺ©μ¬"
                                    />
                                    <div>λͺ©μ¬</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="κΈμ"
                                    />
                                    <div>κΈμ</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="3Dνλ¦°ν"
                                    />
                                    <div>3Dνλ¦°ν</div>
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
                                        value="λ³΅ν©μμ¬"
                                    />
                                    <div>λ³΅ν©μμ¬</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="ν¨λΈλ¦­"
                                    />
                                    <div>ν¨λΈλ¦­</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="μμ΄"
                                    />
                                    <div>μμ΄</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="λ―Έμ "
                                    />
                                    <div>λ―Έμ </div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="κΈ°ν"
                                    />
                                    <div>κΈ°ν</div>
                                </label>
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">μ½νμΈ </div>
                            <div className="column__input">
                                <input
                                    {...register("content")}
                                    placeholder="μ½νμΈ "
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">ν¬κΈ°</div>
                            <div className="column__input">
                                <input
                                    {...register("size")}
                                    placeholder="ν¬κΈ°"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">μΌμ </div>
                            <div className="column__input">
                                <label>
                                    <input
                                        type="radio"
                                        {...register("due")}
                                        value="2μ£Όμ΄λ΄"
                                    />
                                    <div>2μ£Όμ΄λ΄</div>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register("due")}
                                        value="2μ£Ό~4μ£Ό"
                                    />
                                    <div>2μ£Ό~4μ£Ό</div>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register("due")}
                                        value="1λ¬~3λ¬"
                                    />
                                    <div>1λ¬~3λ¬</div>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register("due")}
                                        value="3λ¬μ΄μ"
                                    />
                                    <div>3λ¬μ΄μ</div>
                                </label>
                            </div>
                        </div>
                    </>
                )}
                {watchAll.state === "κ³μ½" && (
                    <>
                        <div className="form__column">
                            <div className="column__head">PM</div>
                            <div className="column__input">
                                <input
                                    {...register("pm")}
                                    placeholder="μ΄λ¦"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="form__column">
                            <div className="column__head">μμ¬</div>
                            <div className="column__input">
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="FRP"
                                    />
                                    <div>FRP</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="μ€ν°λ‘νΌ"
                                    />
                                    <div>μ€ν°λ‘νΌ</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="λͺ©μ¬"
                                    />
                                    <div>λͺ©μ¬</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="κΈμ"
                                    />
                                    <div>κΈμ</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="3Dνλ¦°ν"
                                    />
                                    <div>3Dνλ¦°ν</div>
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
                                        value="λ³΅ν©μμ¬"
                                    />
                                    <div>λ³΅ν©μμ¬</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="ν¨λΈλ¦­"
                                    />
                                    <div>ν¨λΈλ¦­</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="μμ΄"
                                    />
                                    <div>μμ΄</div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="λ―Έμ "
                                    />
                                    <div>λ―Έμ </div>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register("meterial")}
                                        value="κΈ°ν"
                                    />
                                    <div>κΈ°ν</div>
                                </label>
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">μ½νμΈ </div>
                            <div className="column__input">
                                <input
                                    {...register("content")}
                                    placeholder="μ½νμΈ "
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">νλ ₯μ¬</div>
                            <div className="column__input">
                                <input
                                    {...register("orderCompany")}
                                    placeholder="νμ¬λͺ"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="form__column">
                            <div className="column__head">λ©κΈ°μΌ</div>
                            <div className="column__input">
                                <input {...register("deadline")} type="date" />
                            </div>
                        </div>
                    </>
                )}
                {(watchAll.state === "μλ£" || watchAll.state === "λΆλ°") && (
                    <div>κ³ μνμ¨μ΅λλ€ πββοΈπββοΈ</div>
                )}
            </SForm>

            <Button onClick={handleSubmit(onValid)} disabled={loading}>
                {loading ? <Loader /> : "μμ νκΈ°"}
            </Button>
        </>
    );
}

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    height: 600px;
    overflow-y: scroll;
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
        div {
            padding: 6px 10px;
            border-radius: 5px;
            border: 1px solid ${(props) => props.theme.borderColor};
            cursor: pointer;
        }
        input:checked {
            + div {
                background-color: ${(props) => props.theme.accentColor};
                color: white;
            }
        }
        input {
            display: none;
        }
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
    .btnWrapper {
        display: flex;
        justify-content: flex-end;
        button {
            width: 140px;
            height: 40px;
            border-radius: 5px;
            background-color: ${(props) => props.theme.subAccentColor};
            color: white;
            display: flex;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            justify-content: center;
            align-items: center;
        }
    }
`;

export default UpdateContactForm;
