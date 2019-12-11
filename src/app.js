import React from  'react' ;
import ReactDOM from 'react-dom';
import {getUrl, getPageFunctions, getPageDataFromUrl, PAGE_START} from "./paths";
import AppComponent from "./AppComponent";
import * as appCore from "./appCore";

export default function startApp({initialAppState, system, rootElement, onAppStateChange, initialPage = PAGE_START}) {
    let appState = initialAppState || appCore.createAppState();

    system.window.addEventListener("popstate", handlePopState);

    function handlePopState() {
        let newPageData = getPageDataFromUrl(system.window.location.pathname);
        updateAppState(updatePageId, newPageData, {keepPageState: true});
    }

    function updatePageId(appState, {pageId, pathParameters} = {}, {keepPageState = false} = {}) {
        let {createPageState} = getPageFunctions(pageId);
        appState.pageId = pageId;
        if (createPageState && (!appState.pageStates[pageId] || !keepPageState)) {
            appState.pageStates[pageId] = createPageState({pathParameters, appState});
        }
        return appState;
    }

    function triggerEvent(name, data) {
        if (name === "navigate") {
            let {url, keepPageState} = data;
            system.window.history.pushState({}, null, url);
            let newPageData = getPageDataFromUrl(url);
            updateAppState(updatePageId, newPageData, {keepPageState: keepPageState});
        } else if (name === "redirect") {
            let {url, keepPageState} = data;
            system.window.history.replaceState({}, null, url);
            let newPageData = getPageDataFromUrl(url);
            updateAppState(updatePageId, newPageData, {keepPageState: keepPageState});
        }
    }



    function updatePageState(pageId, f) {
        const args = [].slice.call(arguments, 2);
        updateAppState(appCore.onPageStateChange, pageId, f.apply(null, [appCore.getPageState(appState, pageId)].concat(args)));
    }

    function updateAppState(f) {
        const args = [].slice.call(arguments, 1);
        appState = f.apply(null, [appState].concat(args));
        let {performSideEffects} = getPageFunctions(appCore.getPageId(appState));
        performSideEffects && performSideEffects({
            appState: appState,
            updateAppState: updateAppState,
            pageState: appCore.getCurrentPageState(appState),
            updatePageState: updatePageState.bind(null, appCore.getPageId(appState)),
            system: system,
            triggerEvent: triggerEvent
        });
        render();
        onAppStateChange && onAppStateChange(appState)
    }



    function render() {
        ReactDOM.render(
            <AppComponent appState={appState}
                          updateAppState={updateAppState}
                          pageState={appCore.getCurrentPageState(appState)}
                          updatePageState={updatePageState.bind(null, appCore.getPageId(appState))}
                          triggerEvent={triggerEvent}
                          system={system}/>,
          rootElement
        );
    }

    let pageDataFromUrl = getPageDataFromUrl(system.window.location.pathname);
    if (pageDataFromUrl) {
        updateAppState(updatePageId, pageDataFromUrl, {keepPageState: true});
    } else {
        triggerEvent("redirect", {url: getUrl(initialPage)});
    }
}
