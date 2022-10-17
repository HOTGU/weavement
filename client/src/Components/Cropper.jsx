import { useRef, useState } from "react";
import styled from "styled-components";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useRecoilState } from "recoil";
import { columnAtom } from "../atoms/adminPortfolio";

const CropImage = ({ imgObj, columnIndex, reset }) => {
    const { blobUrl, aspect, name } = imgObj;
    const [cropConfig, setCropConfig] = useState();
    const [completeCrop, setCompleteCrop] = useState();
    const [cropDone, setCropDone] = useState(true);
    const [columns, setColumn] = useRecoilState(columnAtom);

    const imgRef = useRef();

    const handleLoad = (e) => {
        const { naturalWidth: width, naturalHeight: height } = e.target;

        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: "%",
                    width: 60,
                },
                aspect,
                width,
                height
            ),
            width,
            height
        );
        setCropConfig(crop);
    };

    function getCroppedImage(ref, cropConfig) {
        const image = new Image();
        image.src = ref.current.src;
        image.onload = function () {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / ref.current.width;
            const scaleY = image.naturalHeight / ref.current.height;
            canvas.width = 1920;
            canvas.height = 1920 / aspect;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                image,
                cropConfig.x * scaleX,
                cropConfig.y * scaleY,
                cropConfig.width * scaleX,
                cropConfig.height * scaleY,
                0,
                0,
                1920,
                1920 / aspect
            );
            canvas.toBlob((blob) => {
                if (!blob) {
                    return;
                }
                const croppedImageUrl = window.URL.createObjectURL(blob);
                const croppedFile = new File([blob], name, {
                    type: "image/jpeg",
                });
                const imageObj = {
                    file: croppedFile,
                    url: croppedImageUrl,
                };
                const updatedColumns = columns.map((column, index) => {
                    if (index === columnIndex) {
                        return {
                            ...column,
                            image: imageObj,
                        };
                    }
                    return { ...column };
                });
                setColumn(updatedColumns);
            }, "image/jpeg");
            reset();
        };
    }

    return (
        <Wrapper ratio={aspect}>
            <ReactCrop
                crop={cropConfig}
                aspect={aspect}
                onChange={(_, cropConfig) => {
                    setCropDone(false);
                    setCropConfig(cropConfig);
                }}
                onComplete={(c) => {
                    setCropDone(true);
                    setCompleteCrop(c);
                }}
            >
                <img ref={imgRef} alt="cropped img" onLoad={handleLoad} src={blobUrl} />
            </ReactCrop>
            <div
                className="doneBtn"
                onClick={(e) => getCroppedImage(imgRef, completeCrop)}
            >
                <div className={cropDone ? "" : "change"}>
                    {cropDone ? "완료" : "변경중..."}
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    .doneBtn {
        width: 100%;
        display: flex;
        justify-content: center;
        div {
            cursor: pointer;
            background-color: ${(props) => props.theme.accentColor};
            color: white;
            width: 100px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            margin-top: 10px;
            border-radius: 20px;
            transition: all 0.1s ease-in-out;
        }
        .change {
            background-color: ${(props) => props.theme.hoverColor};
            color: white;
        }
    }
    img {
        height: 80vh;
        object-fit: contain;
    }
`;

export default CropImage;
