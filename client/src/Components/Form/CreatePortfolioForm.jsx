import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { toast } from "react-toastify";
import {
    pageColumnAtom,
    pageImagesAtom,
    thumbImageWhereAtom,
    totalColumnAtom,
} from "../../atoms/adminPortfolio";
import { createPortfolioApi } from "../../api";
import Loader from "../Loader";

const CreateColumn = ({ target, isLast }) => {
    const [column, setColumn] = useRecoilState(pageColumnAtom);
    const [images, setImages] = useRecoilState(pageImagesAtom);
    const [totalColumn, setTotalColumn] = useRecoilState(totalColumnAtom);

    const deleteColumn = () => {
        setTotalColumn((prev) => prev - 1);
    };

    const handleChange = (e) => {
        const {
            target: { name, files },
        } = e;

        const imgIndex = images.findIndex((i) => i.where === name);

        if (imgIndex > -1) {
            const updateImagesArr = images.map((item) => {
                if (item.where === name) {
                    return {
                        ...item,
                        url: URL.createObjectURL(files[0]),
                        name: files[0].name,
                        file: files[0],
                    };
                } else {
                    return item;
                }
            });
            setImages(updateImagesArr);
        } else {
            setImages([
                ...images,
                {
                    where: name,
                    url: URL.createObjectURL(files[0]),
                    name: files[0].name,
                    file: files[0],
                },
            ]);
        }
    };
    return (
        <div className="form__item">
            <ColumnWrapper>
                <h4>{target} column </h4>
                <Column onClick={() => setColumn({ ...column, [target]: [1] })}>
                    <ColumnItem isActive={column[target]?.length === 1}></ColumnItem>
                </Column>
                <Column onClick={() => setColumn({ ...column, [target]: [1, 2] })}>
                    <ColumnItem isActive={column[target]?.length === 2}></ColumnItem>
                    <ColumnItem isActive={column[target]?.length === 2}></ColumnItem>
                </Column>
                <Column onClick={() => setColumn({ ...column, [target]: [1, 2, 3] })}>
                    <ColumnItem isActive={column[target]?.length === 3}></ColumnItem>
                    <ColumnItem isActive={column[target]?.length === 3}></ColumnItem>
                    <ColumnItem isActive={column[target]?.length === 3}></ColumnItem>
                </Column>
                {isLast && totalColumn > 3 && (
                    <div className="deleteBtn" onClick={deleteColumn}>
                        삭제
                    </div>
                )}
            </ColumnWrapper>
            <div>
                {column[target]?.length > 0 &&
                    column[target].map((n, index) => {
                        return (
                            <FileWrapper key={index}>
                                <label>
                                    {n}번째 사진
                                    <input
                                        type="file"
                                        name={`${target}-${n}`}
                                        onChange={handleChange}
                                    ></input>
                                </label>
                                {images.map((i, imageIndex) => {
                                    if (i.where === `${target}-${n}`) {
                                        return (
                                            <div key={imageIndex}>파일명: {i.name}</div>
                                        );
                                    } else {
                                        return false;
                                    }
                                })}
                            </FileWrapper>
                        );
                    })}
            </div>
        </div>
    );
};
const ColumnWrapper = styled.div`
    display: flex;
    height: 20px;
    gap: 10px;
    h4 {
        display: flex;
        align-items: center;
        width: 140px;
    }
    .deleteBtn {
        background-color: ${(props) => props.theme.red};
        color: ${(props) => props.theme.white};
        cursor: pointer;
        height: 100%;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        border-radius: 3px;
    }
`;
const Column = styled.div`
    display: flex;
    width: 30px;
    height: 20px;
    gap: 1px;
    cursor: pointer;
`;
const ColumnItem = styled.div`
    width: 100%;
    height: 20px;
    background-color: ${(props) =>
        props.isActive ? props.theme.gray : props.theme.borderColor};
    border-radius: 2px;
`;
const FileWrapper = styled.div`
    margin-bottom: 8px;
    label {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.theme.gray};
        color: white;
        border-radius: 3px;
        width: 100px;
        height: 28px;
        cursor: pointer;
    }
    div {
        margin-top: 2px;
    }
    input {
        display: none;
    }
`;

function CreatePortfolioForm({ setModal }) {
    const [loading, setLoading] = useState(false);
    const images = useRecoilValue(pageImagesAtom);
    const thumbWhere = useRecoilValue(thumbImageWhereAtom);
    const [totalColumn, setTotalColumn] = useRecoilState(totalColumnAtom);
    const [column, setColumn] = useRecoilState(pageColumnAtom);
    const resetImages = useResetRecoilState(pageImagesAtom);
    const resetPageColumns = useResetRecoilState(pageColumnAtom);
    const resetTotalColumns = useResetRecoilState(totalColumnAtom);
    const resetThumb = useResetRecoilState(thumbImageWhereAtom);

    const { handleSubmit, register, reset } = useForm();

    const resetAtoms = () => {
        resetImages();
        resetPageColumns();
        resetThumb();
        resetTotalColumns();
    };

    const plusColumn = () => {
        if (totalColumn === 6) return false;
        setTotalColumn((prev) => prev + 1);
        setColumn({ ...column, [totalColumn + 1]: [1] });
    };

    const onValid = async (data) => {
        let columnFileCount = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
        };
        images.forEach((image) => {
            const columnNum = Number(image.where.split("-")[0]);
            columnFileCount[columnNum]++;
        });
        for (let v = 1; v <= totalColumn; v++) {
            if (column[v].length > columnFileCount[v]) {
                toast.error("사진을 채워주세요");
                return;
            }
        }
        if (!data.title || !data.description || !data.where) {
            toast.error("글을 채워주세요");
            return;
        }
        setLoading(true);
        data.image = [];
        images.forEach((image) => {
            const columnNum = Number(image.where.split("-")[0]);
            const pageNum = Number(image.where.split("-")[1]);
            const isCheck = column[columnNum].includes(pageNum);
            if (isCheck) {
                const imgObj = {
                    where: image.where,
                    file: image.file,
                };
                data.image.push(imgObj);
            }
        });
        const fd = new FormData();
        fd.append("title", data.title);
        fd.append("description", data.description);
        fd.append("where", data.where);
        fd.append("thumbWhere", thumbWhere);
        data.image.forEach((image) => {
            fd.append("image", image.file);
            fd.append("imageWhere", image.where);
        });
        try {
            await createPortfolioApi(fd);
            setLoading(false);
            toast.success("포트폴리오가 정상적으로 업로드되었습니다");
            setModal(false);
            reset();
            resetAtoms();
        } catch (error) {
            setLoading(false);
            if (error.response.data.message === "File too large") {
                toast.error("사진용량이 5MB보다 큽니다");
                return;
            }
            toast.error("뭔가 오류가 생겼습니다");
        }
    };

    return (
        <SForm onSubmit={handleSubmit(onValid)}>
            <h3>포트폴리오폼</h3>

            {[...Array(totalColumn)].map((e, i) => {
                return (
                    <div key={i}>
                        <CreateColumn target={i + 1} isLast={i + 1 === totalColumn} />
                    </div>
                );
            })}
            {totalColumn !== 6 && (
                <div className="plusColumn" onClick={plusColumn}>
                    <FontAwesomeIcon icon={faPlusCircle} size="2xl" />
                </div>
            )}

            <div className="form__item">
                <div className="textColumn">
                    <div className="radioWrapper">
                        <h4>text column</h4>
                        <label>
                            <input type="radio" {...register("where")} value="top" />
                            상단
                        </label>
                        <label>
                            <input type="radio" {...register("where")} value="middle" />
                            1번째
                        </label>
                        <label>
                            <input type="radio" {...register("where")} value="bottom" />
                            2번째
                        </label>
                    </div>
                    <input {...register("title")} placeholder="제목" />
                    <textarea {...register("description")} placeholder="본문글" />
                </div>
            </div>
            <button disabled={loading}>{loading ? <Loader /> : "제출"}</button>
        </SForm>
    );
}

const SForm = styled.form`
    gap: 12px;
    width: 400px;
    height: auto;
    border: 1px solid ${(props) => props.theme.gray};
    overflow-y: scroll;
    button {
        width: 100%;
        height: 50px;
        cursor: pointer;
        background-color: ${(props) => props.theme.gray};
        color: ${(props) => props.theme.white};
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .plusColumn {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.2s all ease;
        cursor: pointer;
        height: 210px;
        border-bottom: 1px dotted ${(props) => props.theme.gray};
        svg {
            color: ${(props) => props.theme.gray};
        }
        &:hover {
            background-color: ${(props) => props.theme.lightGray};
        }
    }
    .form__item {
        padding: 10px;
        display: flex;
        flex-direction: column;
        height: fit-content;
        min-height: 210px;
        gap: 10px;
        border-bottom: 1px dotted ${(props) => props.theme.gray};
        .textColumn {
            display: flex;
            flex-direction: column;
            gap: 10px;
            input,
            textarea {
                width: 100%;
                height: 30px;
                border: 1px solid ${(props) => props.theme.gray};
                border-radius: 5px;
                padding: 10px;
            }
            textarea {
                height: 80px;
            }
            .radioWrapper {
                display: flex;
                align-items: center;
                gap: 5px;
                h4 {
                    width: 140px;
                }
                label {
                    display: flex;
                    align-items: center;
                    input {
                        width: 16px;
                    }
                }
            }
        }
    }
`;

export default CreatePortfolioForm;
