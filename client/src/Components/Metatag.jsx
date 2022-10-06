import React from "react";
import { Helmet } from "react-helmet-async";
// import ImgSrc from "../images/weavement-meta-img.png";

function Metatag(props) {
    return (
        <Helmet>
            <title>{props.title || "위브먼트 | 홈"}</title>

            {/* <meta
                name="description"
                content={
                    props.description ||
                    "감각적인 제조, 위브먼트. 디자인 및 설계, FRP 조형물, 3D프린팅, 디지털미디어아트, 맞춤형 서비스 제공."
                }
            />
            <meta
                name="keywords"
                content={
                    props.keywords ||
                    "조형물제작, 디자인, 3D프린팅, 미술프로젝트, 제조서비스, FRP조형물, 캐릭터조형물, 미디어아트"
                }
            />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.title || "위브먼트 WEAVEMENT"} />
            <meta property="og:site_name" content={props.title || "위브먼트 WEAVEMENT"} />
            <meta
                property="og:description"
                content={
                    props.description ||
                    "감각적인 제조, 위브먼트. 디자인 및 설계, FRP 조형물, 3D프린팅, 디지털미디어아트, 맞춤형 서비스 제공."
                }
            />
            <meta property="og:image" content={props.imgsrc || ImgSrc} />
            <meta property="og:url" content={props.url || "weavement.co.kr"} />

            <meta name="twitter:title" content={props.title || "위브먼트 WEAVEMENT"} />
            <meta
                name="twitter:description"
                content={
                    props.description ||
                    "감각적인 제조, 위브먼트. 디자인 및 설계, FRP 조형물, 3D프린팅, 디지털미디어아트, 맞춤형 서비스 제공."
                }
            />
            <meta name="twitter:image" content={props.imgsrc || ImgSrc} />

            <link rel="canonical" href={props.url || "weavement.co.kr"} /> */}
        </Helmet>
    );
}

export default Metatag;
