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
    return false; // When should we perform the search?
}

export function shouldNavigate(pageState) {
    return false; // When should we navigate?
}