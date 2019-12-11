import React from "react";
import {render} from '@testing-library/react';
import {assertElement, setValue, waitFor} from "../../testUtil";
import * as appTestUtils from './../../appTestUtils';
import {PAGE_VIDEO_SEARCH} from "./../../paths";


describe("videoSearch", function () {
    it("No results when opening page", function () {
        let App = appTestUtils.createTestApp({initialPage: PAGE_VIDEO_SEARCH});
        let utils = render(<App />);
        expect(assertElement(utils, 'video-search-page')).toBeTruthy();
        expect(assertElement(utils, 'search-video-result-1')).toBeFalsy();
    });
    it("Show results when a video type is selected", async function () {
        let App = appTestUtils.createTestApp({initialPage: PAGE_VIDEO_SEARCH});
        let utils = render(<App />);
        setValue(utils, 'video-type-selector', 'episode');
        await waitFor(utils, 'search-video-result-1');
    });
});
