import React from "react";
import classNames from "classnames";
import * as core from "./core";
import Loading from "../../components/Loading";
import VideoLink from "../../components/VideoLink";
import Error from "../../components/Error";

function VideoTopicList(props) {
    let {regionCode, pageState, triggerEvent} = props;
    let videos = core.getVideos(pageState, regionCode);

    return (
        <div className="ui column" style={{minWidth: "400px", marginBottom: "2rem"}}>
            <div className="ui column relaxed divided list">
                <h3><i className={classNames(regionCode, "flag")}/>{core.getRegionTitle(regionCode)}</h3>
                {core.shouldShowRegionCodeError(pageState, regionCode) ?
                    <Error/> :
                    videos.map(function (video) {
                        return <VideoLink key={video.id + regionCode} videoId={video.id} snippet={video.snippet} triggerEvent={triggerEvent}/>;
                    })}
            </div>
        </div>
    );
}

export default function Popular(props) {
    const {pageState, triggerEvent} = props;

    if (core.shouldShowLoading(pageState)) {
        return <Loading/>;
    }

    return (
        <div className="ui container padded two column grid">
            <div className="ui row">
                <VideoTopicList regionCode={core.UNITED_STATES} pageState={pageState} triggerEvent={triggerEvent}/>
                <VideoTopicList regionCode={core.GREAT_BRITAIN} pageState={pageState} triggerEvent={triggerEvent}/>
            </div>
            <div className="ui row">
                <VideoTopicList regionCode={core.SWEDEN} pageState={pageState} triggerEvent={triggerEvent}/>
                <VideoTopicList regionCode={core.NORWAY} pageState={pageState} triggerEvent={triggerEvent}/>
            </div>
        </div>
    )
}
