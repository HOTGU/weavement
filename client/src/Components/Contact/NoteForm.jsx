import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { createNoteApi, removeNoteApi, updateNoteApi } from "../../api";
import { useRecoilState } from "recoil";
import { currentNoteAtom } from "../../atoms/contact";
import { toast } from "react-toastify";
import Loader from "../Loader";

function NoteForm({ contact, notes, setNotes }) {
    const [currentNote, setCurrentNote] = useRecoilState(currentNoteAtom);
    const [loading, setLoading] = useState(false);
    const [isOl, setIsOl] = useState(false);
    const { register, handleSubmit, setValue, reset, watch } = useForm({
        defaultValues: useMemo(() => {
            const today = new Date();
            return {
                createdAt: today.toISOString().substring(0, 10),
            };
        }, []),
    });

    useEffect(() => {
        if (currentNote) {
            setValue("createdAt", currentNote?.createdAt.substring(0, 10));
            setValue("text", currentNote?.text);
            setValue("category", currentNote?.category);
        } else {
            reset();
        }
    }, [currentNote, setValue, reset]);

    const handleDeleteNote = async () => {
        setLoading(true);
        try {
            await removeNoteApi(currentNote._id);
            const deletedNotes = notes.filter((note) => {
                return note._id !== currentNote._id;
            });
            setCurrentNote(null);
            setNotes(deletedNotes);
            toast.success("특이사항 삭제성공🎉");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("특이사항 등록실패🤡");
        }
    };

    const onValid = async (formData) => {
        setLoading(true);
        try {
            if (currentNote) {
                const { data } = await updateNoteApi(currentNote._id, formData);
                setCurrentNote(null);
                const updatedNotes = notes.map((note) => {
                    if (note._id === data._id) {
                        return { ...data };
                    }
                    return note;
                });
                setNotes(updatedNotes);
                toast.success("특이사항 수정성공🎉");
            } else {
                const res = await createNoteApi(contact._id, formData);
                setNotes((prev) => [...prev, res.data]);
                reset();
                toast.success("특이사항 등록성공🎉");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("실패🤡");
        }
    };

    const handleKeyDown = (e) => {
        if (e.shiftKey && (e.key === "C" || e.key === "c")) {
            e.preventDefault();
            setIsOl(!isOl);
        }
    };
    const handleKeyUp = (e) => {
        if (isOl && e.keyCode === 13) {
            setValue("text", watch().text + "- ");
        }
    };

    return (
        <SForm onSubmit={handleSubmit(onValid)}>
            <div className="form__column">
                {isOl && "리스트"}
                <textarea
                    {...register("text", {
                        onChange: (e) => {},
                    })}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                />
            </div>

            <div className="form__column">
                <div className="row__column">
                    <input type="date" {...register("createdAt")} />
                    <select {...register("category")}>
                        <option value="질문">고객</option>
                        <option value="답변">WM</option>
                        <option value="공지">공지</option>
                    </select>
                </div>
                <div className="row__column">
                    <button disabled={loading}>
                        {loading ? <Loader /> : currentNote ? "수정" : "생성"}
                    </button>
                    {currentNote && (
                        <button
                            className="delete"
                            disabled={loading}
                            onClick={handleDeleteNote}
                        >
                            삭제
                        </button>
                    )}
                </div>
            </div>
        </SForm>
    );
}

const SForm = styled.form`
    justify-self: flex-end;
    margin-top: auto;
    display: flex;
    gap: 5px;
    height: 260px;
    .form__column {
        &:first-child {
            width: 65%;
            height: 100%;
        }
        &:last-child {
            width: 35%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 5px;
            .row__column {
                display: flex;
                gap: 5px;
                height: 100%;
                input,
                select {
                    width: 50%;
                }
            }
            button {
                width: 100%;
                background-color: ${(props) => props.theme.subAccentColor};
                color: ${(props) => props.theme.white};
                font-weight: 700;
                font-size: 20px;
            }
            .delete {
                background-color: ${(props) => props.theme.accentColor};
            }
        }
    }
    input,
    select,
    textarea,
    button,
    .richText {
        border: 1px solid ${(props) => props.theme.borderColor};
        border-radius: 5px;
        padding: 12px 15px;
        height: 100%;
    }
    button {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    select {
        outline: none;
    }
    textarea {
        width: 100%;
        height: 100%;
        resize: none;
        outline: none;
    }
`;

export default NoteForm;
