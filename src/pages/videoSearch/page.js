import * as core from "./core";
import VideoSearch from "./VideoSearch";
import performSideEffects from "./sideEffects";

export default {
    createPageState: core.createPageState,
    component: VideoSearch,
    performSideEffects: performSideEffects
};