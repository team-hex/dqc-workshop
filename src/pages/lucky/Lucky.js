import React from "react";
import * as core from "./core";

export default function Lucky(props) {
    let {pageState} = props;

    return (
        <div>
            <h3>I feel lucky...</h3>
            {core.getPromptResult(pageState) ?
                <p>Searching for video matching: <span style={{fontWeight: "bold"}}>{core.getPromptResult(pageState)}</span>...</p> : null}
            <p>Is my video showing yet? :(</p>
        </div>
    );
}
