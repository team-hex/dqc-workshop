import lodash from "lodash";
import * as core from "./core";
import * as youtube from "../../services/youtube";
import * as search from "../../services/search";

const debouncedFetchSearchSuggestions = lodash.debounce(function ({pageState, updatePageState}) {
    search.getSearchSuggestions(core.getSearchBarInputValue(pageState))
        .then(function (response) {
            updatePageState(core.onReceiveSearchSuggestions, response);
        });
}, 300);

export default function performSideEffects({pageState, updatePageState, system}) {
    if (core.shouldFetchVideos(pageState)) {
        youtube.getSearchResults(system, {
            q: core.getSearchBarInputValue(pageState),
            videoType: core.getVideoTypeValue(pageState),
            topicId: "any"
        })
            .then(function (response) {
                updatePageState(core.onReceiveVideos, response);
            });
        updatePageState(core.onFetchVideosStarted);
    } else if (core.shouldFetchSearchSuggestions(pageState)) {
        debouncedFetchSearchSuggestions({pageState, updatePageState});
        updatePageState(core.onFetchSearchSuggestionsStarted);
    }
}
