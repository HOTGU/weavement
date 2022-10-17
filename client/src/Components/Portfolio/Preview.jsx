import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { columnAtom, imageFilesAtom, textsAtom } from "../../atoms/adminPortfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faEllipsis,
    faFilePen,
    faMinus,
    faPlus,
    faTrashCan,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";
import Modal from "../Modal";
import CropImage from "../Cropper";

function Preview() {
    const [columns, setColumn] = useRecoilState(columnAtom);
    const [currentIndex, setCurrentIndex] = useState();
    const [showCrop, setShowCrop] = useState(false);
    const [cropImageObj, setCropImageObj] = useState(null);
    const images = useRecoilValue(imageFilesAtom);
    const textArr = useRecoilValue(textsAtom);

    const previewStep = [
        {
            width: 70,
            columnWidth: "20%",
            columnRatio: 1 / 3,
            columnShowRatio: "1:3",
            columnShowStep: 0,
        },
        {
            width: 140,
            columnWidth: "40%",
            columnRatio: 2 / 3,
            columnShowRatio: "2:3",
            columnShowStep: 1,
        },
        {
            width: 175,
            columnWidth: "50%",
            columnRatio: 5 / 6,
            columnShowRatio: "Half",
            columnShowStep: 2,
        },
        {
            width: 210,
            columnWidth: "60%",
            columnRatio: 1,
            columnShowRatio: "1:1",
            columnShowStep: 3,
        },
        {
            width: 280,
            columnWidth: "80%",
            columnRatio: 4 / 3,
            columnShowRatio: "4:3",
            columnShowStep: 4,
        },
        {
            width: 350,
            columnWidth: "100%",
            columnRatio: 5 / 3,
            columnShowRatio: "Full",
            columnShowStep: 5,
        },
    ];

    const minusHandler = (e, target) => {
        const updatedColumn = columns.map((c, index) => {
            if (target === index) {
                return {
                    ...c,
                    ...previewStep[c.columnShowStep !== 0 ? c.columnShowStep - 1 : 0],
                    columnShowStep: c.columnShowStep !== 0 ? c.columnShowStep - 1 : 0,
                };
            }
            return c;
        });
        setColumn(updatedColumn);
        return;
    };

    const plusHandler = (e, target) => {
        const updatedColumn = columns.map((c, index) => {
            if (target === index) {
                return {
                    ...c,
                    ...previewStep[
                        c.columnShowStep !== 5 ? c.columnShowStep + 1 : c.columnShowStep
                    ],
                    columnShowStep:
                        c.columnShowStep !== 5 ? c.columnShowStep + 1 : c.columnShowStep,
                };
            }
            return c;
        });
        setColumn(updatedColumn);
        return;
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
        if (e.dataTransfer.getData("ColumnId")) {
            const dragColumnId = Number(e.dataTransfer.getData("ColumnId"));
            const dragColumn = columns.find((c, index) => index === dragColumnId);
            const dragEndColumnId = target;
            const dragEndColumn = columns.find((c, index) => index === target);

            const updatedColumn = columns.map((column, index) => {
                if (dragEndColumnId === index) {
                    return {
                        ...column,
                        image: dragColumn.image,
                        text: dragColumn.text,
                        thumb: dragColumn.thumb,
                        rep: dragColumn.rep,
                    };
                }
                if (dragColumnId === index) {
                    return {
                        ...column,
                        image: dragEndColumn.image,
                        text: dragEndColumn.text,
                        thumb: dragEndColumn.thumb,
                        rep: dragEndColumn.rep,
                    };
                }
                return { ...column };
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

    const reset = () => {
        setCurrentIndex(null);
        setShowCrop(false);
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
                                onDragStart={(e) => {
                                    e.dataTransfer.setData("ColumnId", index);
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                }}
                                onDragEnter={(e) => {
                                    // console.log("drag아이템온다");
                                }}
                                onDragLeave={(e) => {
                                    // console.log("draG떠난다");
                                }}
                                onDrop={handleDrop}
                                backgroundUrl={columnItem?.image?.url}
                                columnWidth={columnItem?.width}
                                key={index}
                                draggable
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
                                            <>
                                                <div onClick={handleThumb}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </div>
                                                <div
                                                    onClick={(e) => {
                                                        setShowCrop(true);
                                                        setCropImageObj({
                                                            blobUrl: columnItem.image.url,
                                                            name: columnItem.image.file
                                                                .name,
                                                            aspect: Number(
                                                                columnItem.columnRatio
                                                            ),
                                                        });
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faFilePen} />
                                                </div>
                                            </>
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
                                <div className="ratioFont">
                                    {columnItem.columnShowRatio}
                                </div>
                                <div className="sizeBtn">
                                    {columnItem.columnShowStep !== 0 && (
                                        <div onClick={(e) => minusHandler(e, index)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </div>
                                    )}
                                    {columnItem.columnShowStep !== 5 && (
                                        <div onClick={(e) => plusHandler(e, index)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                    )}
                                </div>

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
                                columnShowRatio: "Full",
                                columnShowStep: 5,
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

            <Modal show={showCrop} setShow={setShowCrop}>
                {showCrop && (
                    <CropImage
                        imgObj={cropImageObj}
                        columnIndex={currentIndex}
                        reset={reset}
                    />
                )}
            </Modal>
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
    top: 0px;
    right: 0px;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
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
    top: 0;
    right: 0;
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
    width: calc(${(props) => props.columnWidth}px - 2px);
    height: 210px;
    position: relative;
    background-image: url(${(props) => props.backgroundUrl});
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: grab;
    transition: all 0.1s ease;
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
        font-size: 12px;
        bottom: 0;
        right: 0;
        z-index: 50;
        cursor: pointer;
        display: flex;
        align-items: center;
        svg {
            padding: 3px;
            font-size: 15px;
            background-color: ${(props) => props.theme.accentColor};
            color: white;
            transition: all 0.1s ease;
            &:hover {
                color: #ba7070;
            }
        }
    }
    .ratioFont {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 14px;
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
