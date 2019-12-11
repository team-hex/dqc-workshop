import * as core from "./core";
import Start from "./Start";
import performSideEffects from "./sideEffects";

export default {
    createPageState: core.createPageState,
    component: Start,
    performSideEffects: performSideEffects
};