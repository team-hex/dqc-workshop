import React from "react";
import app from './app.js';
import {performMockedVideoSearch} from "./services/youtubeMocked";

export function createTestApp({fetchYoutube = performMockedVideoSearch, rootElement, initialPage}) {
    return function TestApp(props) {
        return <div ref={function (ref) {
            if (ref) {
                const system = { window, fetchYoutube };
                app({rootElement: ref, system, initialPage });
            } else {
                // destroy app.
            }
        }} />;
    }
}
