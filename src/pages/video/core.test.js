import * as core from "./core";

const videoId = 1;
const mockedSnippet = {title: "testSnippet", description: "mock"};
const mockedVideo = {
    id: videoId,
    snippet: mockedSnippet
};

describe("Video - core", function () {
    it("Happy flow", function () {
        let pageState = core.createPageState({pathParameters: [videoId]});
        expect(core.shouldFetchVideo(pageState)).toBeTruthy();
        expect(core.shouldFetchRelatedVideos(pageState)).toBeTruthy();
        expect(core.shouldShowRelatedVideosLoading(pageState)).toBeTruthy();

        pageState = core.onFetchVideoStarted(pageState);
        pageState = core.onFetchRelatedVideosStarted(pageState);
        expect(core.shouldFetchVideo(pageState)).toBeFalsy();
        expect(core.shouldFetchRelatedVideos(pageState)).toBeFalsy();
        expect(core.shouldShowRelatedVideosLoading(pageState)).toBeTruthy();

        pageState = core.onReceiveVideo(pageState, {data: {items: [mockedVideo]}, ok: true});
        pageState = core.onReceiveRelatedVideos(pageState, {data: {items: [mockedVideo]}, ok: true});
        expect(core.shouldShowRelatedVideosLoading(pageState)).toBeFalsy();
        expect(core.getVideoId(pageState)).toEqual(videoId);
        expect(core.getRelatedVideos(pageState)).toEqual([mockedVideo]);
        expect(core.getVideoSnippet(pageState)).toEqual(mockedSnippet);
    });

    it("should get video snippet or default value", function () {
        let pageState = core.createPageState({pathParameters: [videoId]});
        expect(core.getVideoSnippet(pageState)).toEqual({});

        pageState = core.onReceiveVideo(pageState, {data: {}, ok: true});
        expect(core.getVideoSnippet(pageState)).toEqual({});

        pageState = core.onReceiveVideo(pageState, {data: {items: [{id: videoId}]}, ok: true});
        expect(core.getVideoSnippet(pageState)).toEqual({});

        pageState = core.onReceiveVideo(pageState, {data: {items: [{id: videoId, snippet: mockedSnippet}]}, ok: true});
        expect(core.getVideoSnippet(pageState)).toEqual(mockedSnippet);
    });

    it("should get related videos or default value", function () {
        let pageState = core.createPageState({pathParameters: [videoId]});
        expect(core.getRelatedVideos(pageState)).toEqual([]);

        pageState = core.onReceiveRelatedVideos(pageState, {data: {}, ok: true});
        expect(core.getRelatedVideos(pageState)).toEqual([]);

        pageState = core.onReceiveRelatedVideos(pageState, {data: {items: [mockedVideo]}, ok: true});
        expect(core.getRelatedVideos(pageState)).toEqual([mockedVideo]);
    });
});