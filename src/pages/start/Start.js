import React from "react";
import classNames from "classnames";
import { Tab } from 'semantic-ui-react'
import * as core from "./core";

const EASY = {
    label: "Easy",
    color: "green"
};
const MEDIUM = {
    label: "Medium",
    color: "yellow"
};
const TRICKY = {
    label: "Tricky",
    color: "orange"
};

function Task(props) {
    let {difficulty, theme, children} = props;
    return (
        <div>
            <div className={classNames("ui label", difficulty.color)}>
                {difficulty.label}
            </div>
            <div className="ui label" style={{marginLeft: "5px"}}>
                <i className="book icon"/>
                {theme}
            </div>
            <div style={{marginTop: "1rem"}}>
                {children}
            </div>
        </div>
    );
}

function Task1() {
    return (
        <Task difficulty={EASY} theme="Introduction">
            On the Search page, we want users to be able to search for videos of different topics, similarly to how the video type search works. You should be able to reuse a lot of code for this one.

            Example of some topicIds can be found in the API <a href="https://developers.google.com/youtube/v3/docs/search/list">documentation</a>
        </Task>
    );
}

function Task2() {
    return (
        <Task difficulty={MEDIUM} theme="App-state vs page-state">
            Up in the top right corner we have implemented an auto-play toggle. We need to make this into a controlled component that changes whether or not videos auto-play across the app.
        </Task>
    );
}

function Task3() {
    return (
        <Task difficulty={MEDIUM} theme="Side-effects">
            On the Popular page, we want to show the most popular videos for some countries (how many countries you choose, and which ones, is up to you). The UI components are done, but the service calls still need to be made.
        </Task>
    );
}

function Task4() {
    return (
        <Task difficulty={TRICKY} theme="Side-effects and navigation">
            On the Lucky page we have managed to query the user for a search string. With this search string we now need to fetch a video id and redirect to the Video page.
        </Task>
    );
}

const panes = [
    {
        menuItem: '1. Topic search',
        render: () => <Tab.Pane><Task1/></Tab.Pane>
    },
    {
        menuItem: '2. Autoplay',
        render: () => <Tab.Pane><Task2/></Tab.Pane>
    },
    {
        menuItem: '3. Popular videos',
        render: () => <Tab.Pane><Task3/></Tab.Pane>
    },
    {
        menuItem: '4. Lucky search',
        render: () => <Tab.Pane><Task4/></Tab.Pane>
    },
];

export default function Start(props) {
    let {pageState, updatePageState} = props;

    return (
        <div className="ui container">
            <h2>
                Welcome to MiniTube!
            </h2>
            <p>
                We're very glad you could make it! Time is scarce and there are still a lot of features to be implemented before the big release.
            </p>
            <p>
                Below you can find descriptions of our most urgent tasks:
            </p>
            <Tab panes={panes}
                 activeIndex={core.getActiveTabIndex(pageState)}
                 onTabChange={function (e, { activeIndex }) {
                     updatePageState(core.onActiveTabIndexChange, activeIndex);
                 }}/>
        </div>
    )
}