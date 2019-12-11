import lodash from "lodash";

export const UNITED_STATES = "us";
export const GREAT_BRITAIN = "gb";
export const SWEDEN = "se";
export const NORWAY = "no";

const REGION_TITLE = {
    [UNITED_STATES]: "UNITED_STATES",
    [GREAT_BRITAIN]: "GREAT BRITAIN",
    [SWEDEN]: "SWEDEN",
    [NORWAY]: "NORWAY"
};

export const regionCodes = [UNITED_STATES, NORWAY, SWEDEN, GREAT_BRITAIN];

export function createPageState() {
    let pageState = {
        videoServices: {}
    };
    regionCodes.forEach(function (regionCode) {
        pageState.videoServices[regionCode] = {
            data: null,
            ok: null,
            fetching: false
        };
    });
    return pageState;
}

export function getRegionCodeToFetch(pageState) {
    return lodash.find(regionCodes, function (regionCode) {
        return shouldFetchRegionVideos(pageState, regionCode);
    });
}

export function shouldFetchVideos(pageState) {
    return !!getRegionCodeToFetch(pageState);
}

export function shouldFetchRegionVideos(pageState, regionCode) {
    let service = pageState.videoServices[regionCode];
    return service && service.ok === null && !service.fetching;
}

export function onFetchVideosStarted(pageState, regionCode) {
    pageState.videoServices[regionCode].fetching = true;
    return pageState;
}

export function onReceiveVideos(pageState, {data, ok, error}, regionCode) {
    pageState.videoServices[regionCode].fetching = false;
    pageState.videoServices[regionCode].data = data && data.items;
    pageState.videoServices[regionCode].ok = ok;
    pageState.videoServices[regionCode].error = error;

    return pageState;
}

export function getVideos(pageState, regionCode) {
    return pageState.videoServices[regionCode].data;
}

export function shouldShowRegionCodeError(pageState, regionCode) {
    return !pageState.videoServices[regionCode].ok && pageState.videoServices[regionCode].error;
}

export function shouldShowRegionCodeLoading(pageState, regionCode) {
    return shouldFetchRegionVideos(pageState, regionCode) || pageState.videoServices[regionCode].fetching;
}

export function shouldShowLoading(pageState) {
    return lodash.some(regionCodes, function (regionCode) {
        return shouldShowRegionCodeLoading(pageState, regionCode);
    });
}

export function getRegionTitle(regionCode) {
    return REGION_TITLE[regionCode];
}