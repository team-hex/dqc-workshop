import * as core from "./core";

let mockedVideos = {
    "items": [1, 2, 3]
};

describe("Video Search - core", function () {
    it("Happy Flow", function () {
        let pageState = core.createPageState();
        expect(core.shouldFetchVideos(pageState)).toBeFalsy();
        expect(core.shouldShowVideosError(pageState)).toBeFalsy();
        expect(core.getVideoSearchResults(pageState)).toEqual([]);
        expect(core.shouldFetchSearchSuggestions(pageState)).toBeFalsy();
        expect(core.getSearchSuggestions(pageState)).toEqual([]);
        expect(core.shouldShowVideosLoading(pageState)).toBeFalsy();

        pageState = core.handleSubmit(pageState);
        expect(core.shouldFetchVideos(pageState)).toBeTruthy();
        expect(core.shouldFetchSearchSuggestions(pageState)).toBeFalsy();
        expect(core.shouldShowVideosLoading(pageState)).toBeTruthy();

        pageState = core.onFetchVideosStarted(pageState);
        expect(core.shouldFetchVideos(pageState)).toBeFalsy();
        expect(core.shouldShowVideosLoading(pageState)).toBeTruthy();

        pageState = core.onReceiveVideos(pageState, {data: mockedVideos, ok: true});
        expect(core.shouldFetchVideos(pageState)).toBeFalsy();
        expect(core.shouldShowVideosLoading(pageState)).toBeFalsy();
        expect(core.shouldShowVideosError(pageState)).toBeFalsy();
        expect(core.getVideoSearchResults(pageState)).toEqual([1, 2, 3]);
    });

    it("Changing a select should result in videos requested", function () {
        let pageState = core.createPageState();
        expect(core.shouldFetchVideos(pageState)).toBeFalsy();
        pageState = core.onVideoTypeValueChange(pageState, "value");
        expect(core.shouldFetchVideos(pageState)).toBeTruthy();
    });

    it("Typing in the search bar should result in search suggestions", function () {
        let pageState = core.createPageState();
        expect(core.shouldFetchSearchSuggestions(pageState)).toBeFalsy();
        pageState = core.onSearchBarInputValueChange(pageState, "hello");
        expect(core.shouldFetchVideos(pageState)).toBeFalsy();
        expect(core.shouldFetchSearchSuggestions(pageState)).toBeTruthy();
        pageState = core.onFetchSearchSuggestionsStarted(pageState);
        expect(core.shouldFetchSearchSuggestions(pageState)).toBeFalsy();
        pageState = core.onReceiveSearchSuggestions(pageState, {data: ["hello", ["a", "b", "c"]], ok: true});
        expect(core.getSearchSuggestions(pageState)).toEqual(["a", "b", "c"]);

        // Mismatched search receives should be ignored.
        pageState = core.onReceiveSearchSuggestions(pageState, {data: ["foo", ["c", "b", "a"]], ok: true});
        expect(core.getSearchSuggestions(pageState)).toEqual(["a", "b", "c"]);

        // Choosing a suggestion
        pageState = core.onSearchBarValueClicked(pageState, "a");
        expect(core.shouldFetchSearchSuggestions(pageState)).toBeTruthy();
        expect(core.shouldFetchVideos(pageState)).toBeTruthy();
    });

    it("should handle errors", function () {
        let pageState = core.createPageState();
        pageState = core.handleSubmit(pageState);
        pageState = core.onReceiveVideos(pageState, {data: null, ok: false, error: "Something went wrong"});
        expect(core.shouldShowVideosError(pageState)).toBeTruthy();
    });

    it("Errors from search suggestion should be ignored", function () {
        let pageState = core.createPageState();
        pageState = core.onReceiveSearchSuggestions(pageState, {data: null, ok: false, error: "Something went wrong"});
        expect(core.shouldShowVideosError(pageState)).toBeFalsy();
    });
});
