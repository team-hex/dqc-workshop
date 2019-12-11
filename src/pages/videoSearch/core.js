import lodash from "lodash";

export function createPageState() {
    return {
        searchBarInputValue: "",
        videoTypeValue: "any",
        videoSearchService: {
            requested: false,
            fetching: false,
            data: null
        },
        searchSuggestionService: {
            query: "",
            data: null
        }
    };
}

export function shouldFetchVideos(pageState) {
    return pageState.videoSearchService.requested;
}

export function onFetchVideosStarted(pageState) {
    pageState.videoSearchService.requested = false;
    pageState.videoSearchService.fetching = true;
    return pageState;
}

export function onReceiveVideos(pageState, {data, ok, error}) {
    pageState.videoSearchService.fetching = false;
    pageState.videoSearchService.data = data;
    pageState.videoSearchService.ok = ok;
    pageState.videoSearchService.error = error;
    return pageState;
}

export function shouldShowVideosError(pageState) {
    return !pageState.videoSearchService.ok && pageState.videoSearchService.error;
}

export function getVideoSearchResults(pageState) {
    return lodash.get(pageState, ["videoSearchService", "data", "items"], []);
}

export function shouldFetchSearchSuggestions(pageState) {
    return pageState.searchSuggestionService.query !== pageState.searchBarInputValue;
}

export function onFetchSearchSuggestionsStarted(pageState) {
    pageState.searchSuggestionService.query = pageState.searchBarInputValue;
    return pageState;
}

export function onReceiveSearchSuggestions(pageState, response) {
    let data = response.data;
    if (lodash.isArray(data)) {
        let [query, suggestions] = data;
        if (query === pageState.searchBarInputValue) {
            suggestions = lodash.map(suggestions, function (suggestion) {
                return lodash.isArray(suggestion) ? suggestion[0] : suggestion;
            });
            pageState.searchSuggestionService.data = suggestions;
        }
    }
    return pageState;
}

export function getSearchSuggestions(pageState) {
    return pageState.searchSuggestionService.data || [];
}

export function shouldShowVideosLoading(pageState) {
    return shouldFetchVideos(pageState) || pageState.videoSearchService.fetching;
}

export function handleSubmit(pageState) {
    pageState.videoSearchService.requested = true;
    return pageState;
}

export function getSearchBarInputValue(pageState) {
    return pageState.searchBarInputValue;
}

export function onSearchBarInputValueChange(pageState, value) {
    pageState.searchBarInputValue = value;
    return pageState;
}

export function onSearchBarValueClicked(pageState, value) {
    onSearchBarInputValueChange(pageState, value);
    handleSubmit(pageState);
    return pageState;
}

export function getVideoTypeOptions() {
    return [
        {
            value: "any",
            label: "Any"
        },
        {
            value: "episode",
            label: "Episode"
        },
        {
            value: "movie",
            label: "Movie"
        }
    ];
}

export function getVideoTypeValue(pageState) {
    return pageState.videoTypeValue;
}

export function onVideoTypeValueChange(pageState, value) {
    pageState.videoTypeValue = value;
    handleSubmit(pageState);
    return pageState;
}