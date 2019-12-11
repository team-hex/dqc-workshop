import * as core from "./core";
import Video from "./Video";
import performSideEffects from "./sideEffects";

export default {
    createPageState: core.createPageState,
    component: Video,
    performSideEffects: performSideEffects
};