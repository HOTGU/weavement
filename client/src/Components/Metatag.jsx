import React from "react";
import { Helmet } from "react-helmet-async";

function Metatag(props) {
    return (
        <Helmet>
            <title>{props.title || "위브먼트 | 홈"}</title>
        </Helmet>
    );
}

export default Metatag;
