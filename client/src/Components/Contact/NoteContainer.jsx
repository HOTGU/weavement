import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { currentContactIdAtom } from "../../atoms/contact";
import { toast } from "react-toastify";

import Loader from "../Loader";
import Note from "./Note";
import { getNoteApi } from "../../api";
import NoteForm from "./NoteForm";
import NoteAlertContainer from "./NoteAlertContainer";

function NoteContainer({ contact, show }) {
    const noteEndRef = useRef();
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    const [alertNoteArr, setAlertNoteArr] = useState([]);
    const currentContactId = useRecoilValue(currentContactIdAtom);

    useEffect(() => {
        noteEndRef.current?.scrollIntoView({ behavior: "smooth" });
        const alertNoteArr = notes?.filter((note) => note.category === "공지");
        setAlertNoteArr(alertNoteArr);
    }, [show, notes]);

    useEffect(() => {
        const getNotes = async () => {
            setLoading(true);
            try {
                const { data } = await getNoteApi(contact._id);
                setNotes(data);
            } catch (error) {
                toast.error("뭔가 오류가 생겼습니다");
            }
            setLoading(false);
        };
        if (currentContactId === contact._id) {
            getNotes();
        }
    }, [currentContactId, contact._id]);

    return (
        <Container>
            {loading ? (
                <Loader isCenter={true} width="30px" height="30px" />
            ) : (
                <>
                    <NoteAlertContainer alertNotes={alertNoteArr} />

                    <div className="wrapper">
                        {notes
                            .sort((a, b) => {
                                const dateA = new Date(a.createdAt);
                                const dateB = new Date(b.createdAt);
                                return dateA - dateB;
                            })
                            .map((n) => {
                                return <Note key={n._id} note={n} />;
                            })}

                        <div ref={noteEndRef}></div>
                    </div>

                    <NoteForm notes={notes} setNotes={setNotes} contact={contact} />
                </>
            )}
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
`;

export default NoteContainer;
