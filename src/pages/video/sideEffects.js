import * as core from "./core";
import * as youtube from "../../services/youtube";

export default function performSideEffects({pageState, updatePageState, system}) {
    if (core.shouldFetchVideo(pageState)) {
        youtube.getVideoById(system, core.getVideoId(pageState)).then(function (response) {
            updatePageState(core.onReceiveVideo, response);
        });
        updatePageState(core.onFetchVideoStarted);
    } else if (core.shouldFetchRelatedVideos(pageState)) {
        youtube.getRelatedVideosById(system, core.getVideoId(pageState)).then(function (response) {
            updatePageState(core.onReceiveRelatedVideos, response);
        });
        updatePageState(core.onFetchRelatedVideosStarted);
    }
}