import * as core from "./core";
import Popular from "./Popular";
import performSideEffects from "./sideEffects";

export default {
    createPageState: core.createPageState,
    component: Popular,
    performSideEffects: performSideEffects
};
