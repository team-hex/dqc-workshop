import React from "react";
import classNames from "classnames";
import * as core from "./core";
import Loading from "../../components/Loading";
import VideoLink from "../../components/VideoLink";

export default function Video(props) {
    const {pageState, triggerEvent} = props;

    const videoSrc = `https://www.youtube.com/embed/${core.getVideoId(pageState)}${"?autoplay=1"/* Should we autoplay? */}`;
    const snippet = core.getVideoSnippet(pageState);
    return (
        <div className="ui padded grid row">
            <div className="ui column twelve wide">
                <div className="ui embed">
                    <iframe src={videoSrc} allowFullScreen allow="autoplay" title="Video player"/>
                </div>
                <div className="ui segment">
                    <h4 className="ui header">{snippet.title}</h4>
                    <p>{snippet.description}</p>
                </div>
            </div>
            <div className={classNames("ui four wide column relaxed divided list")}>
                <h4>Related</h4>
                {core.shouldShowRelatedVideosLoading(pageState) ?
                    <Loading/> :
                    core.getRelatedVideos(pageState).map(function (video) {
                        return <VideoLink key={video.id.videoId} videoId={video.id.videoId} snippet={video.snippet} triggerEvent={triggerEvent}/>;
                    })}
            </div>
        </div>
    );
}