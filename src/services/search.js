import axios from 'axios';

export function getSearchSuggestions(text) {
    return axios.get("https://search.hexlabs.se/complete/search", {
        params: {
            q: text,
            client: "youtube",
            ds: "yt",
            hjson: "t",
            alt: "json"
        }
    });
}