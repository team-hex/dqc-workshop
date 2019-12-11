export function createPageState() {
    return {
        hasOpenedPrompt: false,
        promptResult: null,
        searchService: {
            data: null,
            ok: null,
            fetching: false
        }
    };
}

export function shouldShowPrompt(pageState) {
    return !pageState.hasOpenedPrompt;
}

export function handleOpenPrompt(pageState) {
    pageState.hasOpenedPrompt = true;
    return pageState;
}

export function handleReceivePromptResult(pageState, value) {
    pageState.promptResult = value;
    return pageState;
}

export function getPromptResult(pageState) {
    return pageState.promptResult;
}

export function shouldFetchSearch(pageState) {
    return getPromptResult(pageState) && pageState.searchService.ok === null && !pageState.searchService.fetching;
}

export function onFetchSearchStarted(pageState) {
    pageState.searchService.fetching = true;
    return pageState;
}

export function onReceiveSearch(pageState, {data, ok, error}) {
    pageState.searchService.fetching = false;
    pageState.searchService.data = data && data.items && data.items[0];
    pageState.searchService.ok = ok;
    pageState.searchService.error = error;
    return pageState;
}

export function shouldShowSearchError(pageState) {
    return !pageState.searchService.ok && pageState.searchService.error;
}

export function shouldNavigate(pageState) {
    return !!pageState.searchService.data;
}

export function getVideoId(pageState) {
    return pageState.searchService.data.id.videoId;
}
