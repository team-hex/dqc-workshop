export const UNITED_STATES = "us";
export const SWEDEN = "se";

const REGION_TITLE = {
    [UNITED_STATES]: "UNITED STATES",
    [SWEDEN]: "SWEDEN",
};


export function createPageState() {
    return {

    };
}

export function getRegionTitle(regionCode) {
    return REGION_TITLE[regionCode];
}

export function shouldShowLoading(pageState) {
    return false;
}