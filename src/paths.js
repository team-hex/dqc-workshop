import lodash from "lodash";
import videoSearchPageFunctions from "./pages/videoSearch/page";
import startPageFunctions from "./pages/start/page";
import videoPageFunctions from "./pages/video/page";
import popularPageFunctions from "./pages/popular/page";
import luckyPageFunctions from "./pages/lucky/page";

export const PAGE_START = "start";
export const PAGE_VIDEO_SEARCH = "videoSearch";
export const PAGE_VIDEO = "video";
export const PAGE_POPULAR = "popular";
export const PAGE_LUCKY = "lucky";

const pathParamPattern = "([^/]+)";

const pages = {
    [PAGE_START]: {
        urlPattern: "/start",
        pageFunctions: startPageFunctions
    },
    [PAGE_VIDEO_SEARCH]: {
        urlPattern: "/search",
        pageFunctions: videoSearchPageFunctions
    },
    [PAGE_VIDEO]: {
        urlPattern: `/video/${pathParamPattern}`,
        pageFunctions: videoPageFunctions
    },
    [PAGE_POPULAR]: {
        urlPattern: "/popular",
        pageFunctions: popularPageFunctions
    },
    [PAGE_LUCKY]: {
        urlPattern: "/lucky",
        pageFunctions: luckyPageFunctions
    }
};

export function getPageDataFromUrl(url) {
    return lodash.find(
        lodash.map(pages, function ({urlPattern}, pageId) {
            let match = url.match(urlPattern);
            if (match) {
                return {
                    pageId,
                    pathParameters: match.slice(1)
                };
            }
        })
    );
}

export function getUrl(pageId, {pathParameters = []} = {}) {
    let pageData = pages[pageId];
    let url = pageData && pageData.urlPattern;
    if (url) {
        return lodash.reduce(pathParameters, function (modifiedUrl, pathParam) {
            return modifiedUrl.replace(pathParamPattern, pathParam);
        }, url);
    }
}

export function getPageFunctions(pageId) {
    let pageData = pages[pageId];
    return pageData && pageData.pageFunctions;
}

export function getPageComponent(pageId) {
    return getPageFunctions(pageId).component;
}