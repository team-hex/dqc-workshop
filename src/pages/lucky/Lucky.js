import React from "react";
import * as core from "./core";
import Error from "../../components/Error";

export default function Lucky(props) {
    let {pageState} = props;

    return (
        <div>
            <h3>I feel lucky...</h3>
            {core.shouldShowSearchError(pageState) ? <Error/> : null}
        </div>
    );
}
