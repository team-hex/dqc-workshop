import lodash from "lodash";

export function createPageState({pathParameters: [videoId]}) {
    return {
        videoId: videoId,
        videoService: {
            data: null,
            fetching: false,
            ok: null
        },
        relatedVideosService: {
            data: null,
            fetching: false,
            ok: null
        }
    };
}

export function getVideoId(pageState) {
    return pageState.videoId;
}

export function getVideoSnippet(pageState) {
    return lodash.get(pageState, ["videoService", "data", "items", 0, "snippet"], {});
}

export function shouldFetchVideo(pageState) {
    return pageState.videoService.ok === null && !pageState.videoService.fetching;
}

export function onFetchVideoStarted(pageState) {
    pageState.videoService.fetching = true;
    return pageState;
}

export function onReceiveVideo(pageState, {data, ok, error}) {
    pageState.videoService.fetching = false;
    pageState.videoService.data = data;
    pageState.videoService.ok = ok;
    pageState.videoService.error = error;
    return pageState;
}

export function shouldFetchRelatedVideos(pageState) {
    return pageState.relatedVideosService.ok === null && !pageState.relatedVideosService.fetching;
}

export function onFetchRelatedVideosStarted(pageState) {
    pageState.relatedVideosService.fetching = true;
    return pageState;
}

export function onReceiveRelatedVideos(pageState, {data, ok, error}) {
    pageState.relatedVideosService.fetching = false;
    pageState.relatedVideosService.data = data;
    pageState.relatedVideosService.ok = ok;
    pageState.relatedVideosService.error = error;
    return pageState;
}

export function shouldShowRelatedVideosLoading(pageState) {
    return shouldFetchRelatedVideos(pageState) || pageState.relatedVideosService.fetching;
}

export function getRelatedVideos(pageState) {
    return lodash.get(pageState, ["relatedVideosService", "data", "items"], []);
}