import React from "react";
import {Search} from 'semantic-ui-react'
import * as core from "./core";
import VideoLink from "../../components/VideoLink";
import Error from "../../components/Error";

function SearchBar(props) {
    let {pageState, updatePageState, system} = props;
    return (
        <div className="ui segment" data-testid="video-search-page">
            <form className="ui form"
                  onSubmit={function (event) {
                      event.preventDefault();
                      updatePageState(core.handleSubmit);
                      system.window.document.activeElement.blur();
                  }}>
                <div className="fields">
                    <div className="six wide field">
                        <Search
                            loading={core.shouldShowVideosLoading(pageState)}
                            showNoResults={false}
                            onResultSelect={function (event, {result: {title}}) {
                                updatePageState(core.onSearchBarValueClicked, title);
                            }}
                            onSearchChange={function (event) {
                                updatePageState(core.onSearchBarInputValueChange, event.target.value);
                            }}
                            results={core.getSearchSuggestions(pageState).map(function (s) {
                                return {
                                    title: s
                                };
                            })}
                            value={core.getSearchBarInputValue(pageState)}/>
                    </div>
                </div>
                <div className={"fields"}>
                    <div className={"three wide field"}>
                        <label>Video type</label>
                        <select className={"ui fluid dropdown"}
                                data-testid="video-type-selector"
                                onChange={function (event) {
                                    updatePageState(core.onVideoTypeValueChange, event.target.value);
                                }}
                                value={core.getVideoTypeValue(pageState)}>
                            {core.getVideoTypeOptions().map(function ({value, label}) {
                                return <option key={value} value={value}>{label}</option>
                            })}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default function VideoSearch(props) {
    const {pageState, triggerEvent} = props;
    return (
        <div className="ui container">
            <SearchBar {...props}/>
            <div className="ui padded grid">
                {core.shouldShowVideosError(pageState) ?
                    <Error/> :
                    <div className="ui column relaxed divided list">
                        {core.getVideoSearchResults(pageState).map(function (video, i) {
                            return <VideoLink dataTestId={'search-video-result-' + i} key={video.id.videoId} videoId={video.id.videoId} snippet={video.snippet} triggerEvent={triggerEvent}/>;
                        })}
                    </div>}
            </div>
        </div>
    )
}
