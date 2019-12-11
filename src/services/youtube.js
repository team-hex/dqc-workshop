import axios from 'axios';
import config from "../config";

export function fetch(url, params) {
    let base = axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3/',
        params: {
            part: 'snippet',
            maxResults: 10,
            type: "video",
            key: config.YOUTUBE_API_KEYS[Math.floor(Math.random() * config.YOUTUBE_API_KEYS.length)]
        }
    });
    return base.get(url, {
        params: params
    }).then(function (response) {
        return {
            ok: true,
            data: response.data,
        }
    }).catch(function (error) {
        return {
            ok: false,
            data: null,
            error: error
        }
    });
}

export function getSearchResults(system, params) {
    return system.fetchYoutube('/search', params);
}

export function getVideoById(system, id) {
    return system.fetchYoutube("/videos", {
        id: id,
    });
}

export function getRelatedVideosById(system, id) {
    return system.fetchYoutube("/search", {
        relatedToVideoId: id
    });
}

export function getMostPopularByRegionCode(system, regionCode) {
    return system.fetchYoutube("/videos", {
        chart: "mostPopular",
        regionCode: regionCode,
        maxResults: 5,
    });
}