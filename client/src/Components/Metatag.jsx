import React from "react";
import { Helmet } from "react-helmet-async";

function Metatag(props) {
    return (
        <Helmet>
            <title>{props.title}</title>
        </Helmet>
    );
}

export default Metatag;
