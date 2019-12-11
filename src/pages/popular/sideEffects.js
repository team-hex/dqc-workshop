import * as core from "./core";
import * as youtube from "../../services/youtube";

export default function performSideEffects({pageState, updatePageState, system}) {
    if (false) { // Should we fetch?
        let regionCode = core.UNITED_STATES; // Which code to fetch?
        youtube.getMostPopularByRegionCode(system, regionCode)
            .then(function (response) {
                // Update state on receive
            });

        // Update state to prevent us from entering this if clause again
    }
}
