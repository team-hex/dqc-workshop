import * as core from "./core";
import * as youtube from "../../services/youtube";

export default function performSideEffects({pageState, updatePageState, system}) {
    if (core.shouldFetchVideos(pageState)) {
        let regionCode = core.getRegionCodeToFetch(pageState);
        youtube.getMostPopularByRegionCode(system, regionCode)
            .then(function (response) {
                updatePageState(core.onReceiveVideos, response, regionCode);
            });
        updatePageState(core.onFetchVideosStarted, regionCode);
    }
}
