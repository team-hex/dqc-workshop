import React from "react";
import classNames from "classnames";
import {getUrl, PAGE_VIDEO} from "../paths";
import videoLinkCss from "./VideoLink.module.scss";
import Link from "./Link";

export default function VideoLink(props) {
    let {videoId, snippet, triggerEvent, dataTestId} = props;

    return (
        <Link className={classNames(videoLinkCss.videoItem, "item")}
              href={getUrl(PAGE_VIDEO, {pathParameters: [videoId]})}
              triggerEvent={triggerEvent}
              dataTestId={dataTestId}>
            <img className="ui image" src={snippet.thumbnails.medium.url} alt={snippet.description}/>
            <div className="content">
                <div className="header ">{snippet.title}</div>
            </div>
        </Link>
    );
}