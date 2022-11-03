import React, { useRef, useState } from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilState, useResetRecoilState } from "recoil";
import { faCamera, faT, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";

import { columnAtom, imageFilesAtom, textsAtom } from "../../atoms/adminPortfolio";
import { createPortfolioApi } from "../../api";
import Loader from "../Loader";
import { allGetPortfolioSelector } from "../../atoms/portfolio";

function Form() {
    const fileRef = useRef();
    const [column, setColumn] = useRecoilState(columnAtom);
    const [images, setImages] = useRecoilState(imageFilesAtom);
    const [textArr, setTextArr] = useRecoilState(textsAtom);
    const reset = useResetRecoilState(allGetPortfolioSelector);
    const [showTextForm, setShowTextForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const { handleSubmit, register, watch, setValue } = useForm();

    const handleChange = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        setLoading(true);
        for (var i = 0; i < e.target.files.length; i++) {
            const imgObj = {
                id: uuidv4(),
                url: URL.createObjectURL(e.target.files[i]),
                file: e.target.files[i],
            };
            setImages((prev) => [...prev, imgObj]);
        }
        setLoading(false);
    };

    const onValid = async () => {
        let isThumb = false;
        let isRep = false;
        if (column.length === 0) {
            toast.error("페이지를 생성하세요");
            return;
        }
        const fd = new FormData();
        const options = {
            maxSizeMB: 2, // 허용하는 최대 사이즈 지정
            maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
            useWebWorker: true, // webworker 사용 여부
        };
        setLoading(true);
        for (let i = 0; i < column.length; i++) {
            if (!column[i].image && !column[i].text) {
                toast.error("페이지를 사진과 글로 채우세요");
                setLoading(false);
                return;
            }
            if (column[i].image) {
                const compressedBlob = await imageCompression(
                    column[i].image.file,
                    options
                );
                const compressedFile = new File(
                    [compressedBlob],
                    `${compressedBlob.name}`,
                    {
                        type: compressedBlob.type,
                    }
                );
                fd.append("image", compressedFile);
                fd.append("imageIndex", i);
                fd.append("imageWidth", column[i].columnWidth);
                fd.append("imageRatio", column[i].columnRatio);
                fd.append("thumbIndex", column[i].thumb);
                if (column[i].thumb) {
                    isThumb = true;
                }
            }
            if (column[i].text) {
                fd.append("title", column[i].text.title);
                fd.append("description", column[i].text.description);
                fd.append("textIndex", i);
                fd.append("textWidth", column[i].columnWidth);
                fd.append("textRatio", column[i].columnRatio);
                if (column[i].rep) {
                    isRep = true;
                    fd.append("repTitle", column[i].text.title);
                    fd.append("repDescription", column[i].text.description);
                }
            }
        }
        if (!isRep || !isThumb) {
            toast.error("대표 글과 사진을 선택하세요 🤡");
            setLoading(false);
            return;
        }
        try {
            await createPortfolioApi(fd);
            toast.success("포트폴리오 등록 성공 🎉");
            setLoading(false);
            setColumn([]);
            setImages([]);
            setTextArr([]);
            reset();
        } catch (error) {
            setLoading(false);
            toast.success("포트폴리오 등록 실패 🤡");
        }
    };

    const createText = () => {
        const title = watch().title;
        const description = watch().description;
        if (!title && !description) {
            toast.info("제목과 본문을 입력하세요");
            return;
        }
        setTextArr((prev) => [
            ...prev,
            {
                id: uuidv4(),
                title,
                description,
            },
        ]);
        setValue("title", "");
        setValue("description", "");
        setShowTextForm(false);
    };

    return (
        <SForm onSubmit={handleSubmit(onValid)}>
            <input ref={fileRef} type="file" multiple onChange={handleChange} hidden />
            <div className="box-container">
                <div className="box" onClick={() => fileRef.current.click()}>
                    <FontAwesomeIcon icon={faCamera} />
                </div>
                <div
                    className={showTextForm ? "box isActive" : "box"}
                    onClick={() => setShowTextForm(!showTextForm)}
                >
                    <FontAwesomeIcon icon={showTextForm ? faXmark : faT} />
                </div>
            </div>
            {showTextForm && (
                <div className="text-container">
                    <input type="text" placeholder="제목" {...register("title")} />
                    <textarea placeholder="본문" {...register("description")} />
                    <div className="plus" onClick={createText}>
                        추가
                    </div>
                </div>
            )}
            <div className="output">
                {images.map((image) => {
                    return (
                        <Preview
                            onDragStart={(e) =>
                                e.dataTransfer.setData("ImageId", image.id)
                            }
                            draggable
                            key={image.id}
                        >
                            <LazyLoadImage effect="blur" src={image.url}></LazyLoadImage>
                            <OptionBtn
                                onClick={(e) => {
                                    const deletedArr = images.filter((item) => {
                                        if (image.id === item.id) {
                                            URL.revokeObjectURL(image.url);
                                        }
                                        return image.id !== item.id;
                                    });
                                    setImages(deletedArr);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </OptionBtn>
                        </Preview>
                    );
                })}
                {textArr.map((text) => {
                    return (
                        <Preview
                            onDragStart={(e) => {
                                e.dataTransfer.setData("TextId", text.id);
                            }}
                            key={text.id}
                            draggable
                        >
                            <OptionBtn
                                onClick={() => {
                                    const deletedArr = textArr.filter((copyText) => {
                                        return copyText.id !== text.id;
                                    });
                                    setTextArr(deletedArr);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </OptionBtn>
                            {text.title.length > 6 ? (
                                <h4>{text.title.substring(0, 6)}...</h4>
                            ) : (
                                <h4>{text.title}</h4>
                            )}
                        </Preview>
                    );
                })}
            </div>
            <button disabled={loading}>{loading ? <Loader /> : "포트폴리오 등록"}</button>
        </SForm>
    );
}

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    .box-container {
        display: flex;
        gap: 2px;
        .box {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #585858;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
        .isActive {
            background-color: black;
        }
    }
    .text-container {
        display: flex;
        flex-direction: column;
        gap: 2px;
        textarea {
            height: 150px;
        }
        .plus {
            text-align: center;
            cursor: pointer;
        }
    }
    input,
    textarea,
    .plus,
    button {
        width: 100%;
        background-color: black;
        padding: 10px;
        border: none;
        border-radius: 5px;
        color: white;
    }
    button {
        cursor: pointer;
        text-align: center;
        height: 50px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #585858;
        font-size: 16px;
        transition: all 0.2s ease;
        justify-self: flex-end;
        margin-top: auto;
        &:hover {
            background-color: black;
        }
    }
    .output {
        display: flex;
        flex-wrap: wrap;
        max-height: 500px;
        overflow-y: scroll;
        gap: 10px;
        overflow-y: auto;
        ::-webkit-scrollbar {
            width: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #585858;
            border-radius: 5px;
        }
    }
`;

const Preview = styled.div`
    width: 60px;
    height: 60px;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: white;
    cursor: grab;
    transition: all 0.1s ease;
    &:active {
        border: 2px dotted ${(props) => props.theme.accentColor};
    }
    span {
        width: inherit;
        height: inherit;
    }
    img {
        object-fit: cover;
        border-radius: 5px;
        width: inherit;
        height: inherit;
        &:active {
            border: 2px dotted ${(props) => props.theme.accentColor};
        }
    }
    h4 {
        font-size: 12px;
        text-align: center;
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
    width: 16px;
    height: 16px;
    background-color: white;
    box-shadow: ${(props) => props.theme.boxShadow};
    cursor: pointer;
    z-index: 50;
    svg {
        width: 8px;
    }
`;

export default Form;
