export function createPageState() {
    return {
        activeTabIndex: 0
    };
}

export function getActiveTabIndex(pageState) {
    return pageState.activeTabIndex;
}

export function onActiveTabIndexChange(pageState, value) {
    pageState.activeTabIndex = value;
    return pageState;
}