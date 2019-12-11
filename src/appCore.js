export function createAppState() {
    return {
        pageId: null,
        pageStates: {}
    };
}

export function getPageId(appState) {
    return appState.pageId;
}

export function getPageState(appState, pageId) {
    return appState.pageStates[pageId];
}

export function getCurrentPageState(appState) {
    return appState.pageStates[appState.pageId];
}

export function onPageStateChange(appState, pageId, value) {
    appState.pageStates[pageId] = value;
    return appState;
}