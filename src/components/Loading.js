import React from "react";
import classNames from "classnames";

export default function Loading(props) {
    let {inline} = props;
    return <div className={classNames("ui active centered text loader", inline && "inline")}>Loading</div>;
}