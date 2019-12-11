import * as core from "./core";
import * as youtube from "../../services/youtube";
import {getUrl, PAGE_VIDEO} from "../../paths";

export default function performSideEffects({pageState, updatePageState, system, triggerEvent}) {
    if (core.shouldShowPrompt(pageState)) {
        updatePageState(core.handleOpenPrompt);
        let result = system.window.prompt("What do you want to see, lucky one?") || "dQw4w9WgXcQ";
        updatePageState(core.handleReceivePromptResult, result);
    } else if (core.shouldFetchSearch(pageState)) {
        youtube.getSearchResults(system, {q: core.getPromptResult(pageState)})
            .then(function (response) {
                updatePageState(core.onReceiveSearch, response);
            });
        updatePageState(core.onFetchSearchStarted);
    } else if (core.shouldNavigate(pageState)) {
        let url = getUrl(PAGE_VIDEO, {pathParameters: [core.getVideoId(pageState)]});
        triggerEvent("navigate", {url: url});
    }
}
