import React, { useEffect, useMemo, useRef, useState } from "react";
import Moment from "react-moment";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { currentNoteAtom } from "../../atoms/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import Loader from "../Loader";
import Note from "./Note";
import { createNoteApi, removeNoteApi, updateNoteApi } from "../../api";

function NoteContainer({ contact, show }) {
    const noteEndRef = useRef();
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState(contact.note);
    const [showAlertNote, setShowAlertNote] = useState(false);
    const [alertNoteArr, setAlertNoteArr] = useState([]);
    const [currentNote, setCurrentNote] = useRecoilState(currentNoteAtom);
    const { register, handleSubmit, setValue, reset } = useForm({
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

    useEffect(() => {
        noteEndRef.current?.scrollIntoView({ behavior: "smooth" });
        const alertNoteArr = contact.note.filter((note) => note.category === "공지");
        setAlertNoteArr(alertNoteArr);
    }, [show, contact.note]);

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
            console.log(error);
            toast.error("실패🤡");
        }
    };

    return (
        <Container>
            {alertNoteArr.length > 0 && (
                <div className="alertNote">
                    <div className="alertNote__head">
                        <h4>
                            🔊{" "}
                            <Moment format="MM/DD">
                                {alertNoteArr[alertNoteArr.length - 1]?.createdAt}
                            </Moment>{" "}
                            {alertNoteArr[alertNoteArr.length - 1]?.text}
                        </h4>
                        {alertNoteArr.length > 1 && (
                            <FontAwesomeIcon
                                onClick={() => {
                                    setShowAlertNote((prev) => !prev);
                                }}
                                icon={showAlertNote ? faChevronUp : faChevronDown}
                            />
                        )}
                    </div>
                    <div className={`alertNote__body ${showAlertNote ? "isActive" : ""}`}>
                        {alertNoteArr.reverse().map((note, index) => {
                            if (index === 0) return false;
                            return (
                                <div key={index}>
                                    <Moment format="MM/DD">{note?.createdAt}</Moment>{" "}
                                    {note.text}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            <div className="wrapper">
                {notes.map((n) => {
                    return <Note key={n._id} note={n} />;
                })}

                <div ref={noteEndRef}></div>
            </div>
            <form onSubmit={handleSubmit(onValid)}>
                <div className="form__column">
                    <textarea {...register("text")} />
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
            </form>
        </Container>
    );
}

const Container = styled.div`
    width: 800px;
    height: 800px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    .alertNote {
        height: fit-content;
        width: 100%;
        border: 1px solid ${(props) => props.theme.borderColor};
        border-radius: 5px;
        padding: 10px;

        &__head {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            h4 {
                font-size: 20px;
                font-weight: 700;
            }
            svg {
                cursor: pointer;
            }
        }
        &__body {
            transition: all 0.25s ease;
            overflow: hidden;
            padding: 0;
            line-height: 0;
        }
        .isActive {
            line-height: 1.5;
        }
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 10px;
        overflow-y: scroll;
        border: 1px solid ${(props) => props.theme.borderColor};
        border-radius: 5px;
        padding: 10px;
        &::-webkit-scrollbar {
            width: 10px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: ${(props) => props.theme.borderColor};
            border-radius: 10px;
        }
        &::-webkit-scrollbar-track {
            background-color: ${(props) => props.theme.bgColor};
        }
    }
    form {
        justify-self: flex-end;
        margin-top: auto;
        display: flex;
        gap: 5px;
        height: 100px;
        .form__column {
            &:first-child {
                width: 65%;
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
        button {
            border: 1px solid ${(props) => props.theme.borderColor};
            border-radius: 5px;
            padding: 12px 15px;
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
    }
`;

export default NoteContainer;
