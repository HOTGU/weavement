import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { columnAtom, imageFilesAtom, textsAtom } from "../../atoms/adminPortfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faEllipsis,
    faPlus,
    faTrashCan,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";

function Preview() {
    const [columns, setColumn] = useRecoilState(columnAtom);
    const [currentIndex, setCurrentIndex] = useState();
    const images = useRecoilValue(imageFilesAtom);
    const textArr = useRecoilValue(textsAtom);

    const handler = (e, target) => {
        const startSize = columns[target].width;
        const startPosition = e.pageX;
        let width;
        function onMouseMove(event) {
            width = startSize - startPosition + event.pageX;
            const updatedColumn = columns.map((c, index) => {
                if (target === index) {
                    return { ...c, width };
                }
                return c;
            });
            setColumn(updatedColumn);
        }

        function onMouseUp() {
            if (width > 315) {
                const updatedColumn = columns.map((c, index) => {
                    if (target === index) {
                        return {
                            ...c,
                            width: 350,
                            columnWidth: "100%",
                            columnRatio: 5 / 3,
                        };
                    }
                    return c;
                });
                setColumn(updatedColumn);
                document.body.removeEventListener("mousemove", onMouseMove);
                return;
            }
            if (width > 245) {
                const updatedColumn = columns.map((c, index) => {
                    if (target === index) {
                        return {
                            ...c,
                            width: 280,
                            columnWidth: "80%",
                            columnRatio: 4 / 3,
                        };
                    }
                    return c;
                });
                setColumn(updatedColumn);
                document.body.removeEventListener("mousemove", onMouseMove);
                return;
            }
            if (width > 195) {
                const updatedColumn = columns.map((c, index) => {
                    if (target === index) {
                        return {
                            ...c,
                            width: 210,
                            columnWidth: "60%",
                            columnRatio: 1,
                        };
                    }
                    return c;
                });
                setColumn(updatedColumn);
                document.body.removeEventListener("mousemove", onMouseMove);
                return;
            }
            if (width > 160) {
                const updatedColumn = columns.map((c, index) => {
                    if (target === index) {
                        return {
                            ...c,
                            width: 175,
                            columnWidth: "50%",
                            columnRatio: 5 / 6,
                        };
                    }
                    return c;
                });
                setColumn(updatedColumn);
                document.body.removeEventListener("mousemove", onMouseMove);
                return;
            }
            if (width > 105) {
                const updatedColumn = columns.map((c, index) => {
                    if (target === index) {
                        return {
                            ...c,
                            width: 140,
                            columnWidth: "40%",
                            columnRatio: 2 / 3,
                        };
                    }
                    return c;
                });
                setColumn(updatedColumn);
                document.body.removeEventListener("mousemove", onMouseMove);
                return;
            }
            if (width < 105) {
                const updatedColumn = columns.map((c, index) => {
                    if (target === index) {
                        return {
                            ...c,
                            width: 70,
                            columnWidth: "20%",
                            columnRatio: 1 / 3,
                        };
                    }
                    return c;
                });
                setColumn(updatedColumn);
                document.body.removeEventListener("mousemove", onMouseMove);
                return;
            }
            document.body.removeEventListener("mousemove", onMouseMove);
        }

        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp, { once: true });
    };

    const handleDrop = (e) => {
        const target = Number(e.target.id.split("n")[1]);
        if (e.dataTransfer.getData("ImageId")) {
            const id = e.dataTransfer.getData("ImageId");
            const image = images.find((image) => image.id === id);
            const updatedColumn = columns.map((c, index) => {
                if (target === index) {
                    return {
                        ...c,
                        image,
                        text: null,
                        rep: null,
                    };
                }
                return c;
            });
            setColumn(updatedColumn);
        }
        if (e.dataTransfer.getData("TextId")) {
            const id = e.dataTransfer.getData("TextId");
            const text = textArr.find((text) => text.id === id);
            const updatedColumn = columns.map((c, index) => {
                if (target === index) {
                    return {
                        ...c,
                        text,
                        image: null,
                        thumb: false,
                        rep: null,
                    };
                }
                return c;
            });
            setColumn(updatedColumn);
        }
    };

    const handleColumnDelete = () => {
        const copyArr = [...columns];
        const deletedArr = copyArr.filter((__, itemIndex) => {
            return currentIndex !== itemIndex;
        });
        setColumn(deletedArr);
        setCurrentIndex(null);
        return;
    };

    const handleThumb = () => {
        const updatedArr = columns.map((item, itemIndex) => {
            if (item.image) {
                if (itemIndex === currentIndex) {
                    return { ...item, thumb: true };
                } else {
                    return { ...item, thumb: false };
                }
            }
            return item;
        });
        setColumn(updatedArr);
        setCurrentIndex(null);
        return;
    };

    const handleRep = () => {
        const updatedArr = columns.map((item, itemIndex) => {
            if (item.text) {
                if (itemIndex === currentIndex) {
                    return { ...item, rep: item.text };
                } else {
                    return { ...item, rep: null };
                }
            }
            return item;
        });
        setColumn(updatedArr);
        setCurrentIndex(null);
        return;
    };

    return (
        <Wrapper>
            <PortfolioPreview>
                {columns.length > 0 &&
                    columns.map((columnItem, index) => {
                        return (
                            <Column
                                className="column"
                                id={`column${index}`}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                }}
                                onDrop={handleDrop}
                                backgroundUrl={columnItem?.image?.url}
                                columnWidth={columnItem?.width}
                                key={index}
                            >
                                {currentIndex === index ? (
                                    <OptionPaper>
                                        <div onClick={() => setCurrentIndex(null)}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </div>
                                        <div onClick={handleColumnDelete}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </div>
                                        {columnItem?.image && (
                                            <div onClick={handleThumb}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </div>
                                        )}
                                        {columnItem?.text && (
                                            <div onClick={handleRep}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </div>
                                        )}
                                    </OptionPaper>
                                ) : (
                                    <OptionBtn
                                        onClick={(e) => {
                                            setCurrentIndex(index);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEllipsis} />
                                    </OptionBtn>
                                )}
                                <h4>{columnItem?.text?.title}</h4>
                                <p>{columnItem?.text?.description}</p>
                                <div
                                    className="sizeBtn"
                                    onMouseDown={(e) => handler(e, index)}
                                    draggable={false}
                                    onDragStart={(e) => e.preventDefault()}
                                ></div>

                                {columnItem?.thumb && (
                                    <div className="isRep">대표사진</div>
                                )}
                                {columnItem?.rep && <div className="isRep">대표글</div>}
                            </Column>
                        );
                    })}
                <CreatePreview
                    onClick={() => {
                        setColumn((prev) => [
                            ...prev,
                            {
                                width: 350,
                                columnWidth: "100%",
                                columnRatio: 5 / 3,
                                thumb: false,
                                rep: null,
                            },
                        ]);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} size="xl" />
                </CreatePreview>
            </PortfolioPreview>
            <Sticky>
                <Form />
            </Sticky>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 700px;
    overflow-y: scroll;
    display: flex;
    padding: 10px;
    gap: 10px;
    background-color: #f7f7f7;
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #3e3e3e;
    }
`;

const OptionBtn = styled.div`
    position: absolute;
    top: -2px;
    right: -2px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    background-color: white;
    box-shadow: ${(props) => props.theme.boxShadow};
    cursor: pointer;
    z-index: 50;
    svg {
        width: 10px;
    }
`;
const OptionPaper = styled.div`
    position: absolute;
    top: -2px;
    right: -2px;
    width: auto;
    height: auto;
    background-color: white;
    box-shadow: ${(props) => props.theme.boxShadow};
    cursor: pointer;
    z-index: 50;
    div {
        width: 60px;
        padding: 10px;
        text-align: center;
        &:hover {
            background-color: ${(props) => props.theme.hoverColor};
        }
    }
`;

const Column = styled.div`
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 5px;
    width: calc(${(props) => props.columnWidth}px - 2px);
    height: 210px;
    position: relative;
    background-image: url(${(props) => props.backgroundUrl});
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .back {
        position: absolute;
        height: 200px;
        background-color: rgba(91, 22, 22, 0.5);
        top: 0;
        bottom: 0;
        z-index: 5;
    }
    .sizeBtn {
        position: absolute;
        border-right: 3px solid ${(props) => props.theme.accentColor};
        border-bottom: 3px solid ${(props) => props.theme.accentColor};
        width: 15px;
        height: 15px;
        bottom: 2px;
        right: 2px;
        z-index: 50;
        cursor: pointer;
    }
    h4 {
        font-size: 12px;
        font-weight: 700;
    }
    p {
        font-size: 10px;
        font-weight: 300;
    }
    .isRep {
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: ${(props) => props.theme.accentColor};
        padding: 5px 8px;
        font-size: 12px;
        color: white;
    }
`;

const PortfolioPreview = styled.div`
    width: 350px;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
`;
const Sticky = styled.div`
    position: sticky;
    top: 5px;
    width: 100%;
    background-color: #e6e6e6;
    border-radius: 5px;
    padding: 10px;
    height: 100%;
`;

const CreatePreview = styled.div`
    width: 350px;
    height: 50px;
    border: 1px solid ${(props) => props.theme.hoverColor};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: white;
    background-color: #585858;
    &:hover {
        background-color: black;
    }
`;

export default Preview;
