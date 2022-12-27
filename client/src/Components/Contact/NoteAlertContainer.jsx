import React, { useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NoteAlertContainer({ alertNotes }) {
    const [showAlertNote, setShowAlertNote] = useState(false);
    return (
        <div>
            {alertNotes.length > 0 && (
                <Container className="alertNote">
                    <div className="alertNote__head">
                        <h4>
                            🔊{" "}
                            <Moment format="MM/DD">
                                {alertNotes[alertNotes.length - 1]?.createdAt}
                            </Moment>{" "}
                            {alertNotes[alertNotes.length - 1]?.text}
                        </h4>
                        {alertNotes.length > 1 && (
                            <FontAwesomeIcon
                                onClick={() => {
                                    setShowAlertNote((prev) => !prev);
                                }}
                                icon={showAlertNote ? faChevronUp : faChevronDown}
                            />
                        )}
                    </div>
                    <div className={`alertNote__body ${showAlertNote ? "isActive" : ""}`}>
                        {alertNotes.reverse().map((note, index) => {
                            if (index === 0) return false;
                            return (
                                <div key={index}>
                                    <Moment format="MM/DD">{note?.createdAt}</Moment>{" "}
                                    {note.text}
                                </div>
                            );
                        })}
                    </div>
                </Container>
            )}
        </div>
    );
}

const Container = styled.div`
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
`;

export default NoteAlertContainer;
