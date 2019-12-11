import lodash from "lodash";
import app from "./app";
import config from './config';
import * as youtube from './services/youtube';
import { performMockedVideoSearch } from "./services/youtubeMocked";

// Note: These should be split into 2 files. index.js & dev-index.js. (so we do not load dev-stuff when running prod)
// However create-react-app that we used for this example-app does not provide any API for multiple index.js entry points

const mode = process.env.REACT_APP_STAGE === "prod" ? "prod" : "dev";

const initialAppState = config[mode].hotReload ? JSON.parse(window.sessionStorage.getItem("appState")) : null;

const fetchYoutube = config[mode].mockedMode ? performMockedVideoSearch : youtube.fetch;
const system = { window: window, fetchYoutube };

const rootElement = document.querySelector("#root");

const saveAppStateToSessionStorage = lodash.debounce(function (appState) {
  window.sessionStorage.setItem("appState", JSON.stringify(appState));
}, 500);

const onAppStateChange = config.dev.hotReload ? function (appState) {
  saveAppStateToSessionStorage(appState)
} : null;


app({ initialAppState, rootElement, system, onAppStateChange });

