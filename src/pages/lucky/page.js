import * as core from "./core";
import Lucky from "./Lucky";
import performSideEffects from "./sideEffects";

export default {
    createPageState: core.createPageState,
    component: Lucky,
    performSideEffects: performSideEffects
};
