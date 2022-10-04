import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { currentNoteAtom } from "../../atoms/contact";

function Note({ note }) {
    const [currentNote, setCurrentNote] = useRecoilState(currentNoteAtom);

    return (
        <NoteColumn category={note.category} key={note._id}>
            <NoteWrapper category={note.category} isMe={note._id === currentNote?._id}>
                <div className="note__text">{note.text}</div>

                <div className="note__bottom">
                    <Moment format="YYYY/ MM/ DD">{note.createdAt}</Moment>
                    <div className="btn-container">
                        <div onClick={() => setCurrentNote(note)} className="box">
                            편집
                        </div>
                    </div>
                </div>
                {currentNote?._id === note._id && (
                    <div className="cancelContainer" onClick={() => setCurrentNote(null)}>
                        <FontAwesomeIcon icon={faXmark} size="2x" />
                    </div>
                )}
            </NoteWrapper>
        </NoteColumn>
    );
}

const NoteColumn = styled.div`
    align-self: ${(props) =>
        props.category === "답변"
            ? "flex-end"
            : props.category === "질문"
            ? "flex-start"
            : "center"};
    width: fit-content;
    max-width: 60%;
    min-width: 200px;
    display: flex;
    flex-direction: column;
`;

const NoteWrapper = styled.div`
    position: relative;
    padding: 10px 16px;
    line-height: 20px;
    border: 1px solid ${(props) => (props.isMe ? "#2f3640" : props.theme.borderColor)};
    background-color: ${(props) =>
        props.category === "답변"
            ? "#EDF0DB"
            : props.category === "질문"
            ? props.theme.white
            : props.theme.lightGray};
    box-shadow: ${(props) =>
        props.category === "공지" ? props.theme.boxShadow : "none"};
    font-weight: ${(props) => (props.category === "공지" ? "700" : "400")};
    text-align: ${(props) => (props.category === "공지" ? "center" : "left")};
    .note__text {
        white-space: pre-wrap;
        margin-bottom: 10px;
    }
    .note__bottom {
        display: flex;
        flex-direction: ${(props) => (props.category === "답변" ? "row-reverse" : "row")};
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
    }
    .btn-container {
        display: flex;
        gap: 2px;
    }
    .box {
        width: 28px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        cursor: pointer;
        border: 1px solid #dcdde1;
    }
    .cancelContainer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 12px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 16px;
    }
`;

export default Note;
