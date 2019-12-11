import React from "react";
import classNames from "classnames";
import {getUrl, getPageComponent, PAGE_LUCKY, PAGE_POPULAR, PAGE_VIDEO_SEARCH, PAGE_START} from "./paths";
import Link from "./components/Link";
import {Checkbox, Icon} from 'semantic-ui-react'
import * as appCore from "./appCore";

const MENU_OPTIONS = [
    {
        pageId: PAGE_START,
        text: "Start",
        keepPageState: true
    },
    {
        pageId: PAGE_VIDEO_SEARCH,
        text: "Search"
    },
    {
        pageId: PAGE_POPULAR,
        text: "Popular"
    },
    {
        pageId: PAGE_LUCKY,
        text: "Lucky"
    }
];

export default function App(props) {
    let {appState, updateAppState, triggerEvent} = props;
    let PageComponent = getPageComponent(appState.pageId);
    return <div>
        <div className="ui massive menu">
            <div className="item">
                <Icon name="video" color="red"/>
                MiniTube
            </div>
            <div className="right item">
                <Checkbox label="Autoplay"
                          toggle
                          checked={appCore.shouldAutoPlay(appState)}
                          onChange={function () {
                              updateAppState(appCore.onAutoPlayValueChange, !appCore.shouldAutoPlay(appState));
                          }}/>
            </div>
        </div>
        <div style={{display: "flex"}}>
            <div className="ui secondary vertical menu" style={{minWidth: "15rem"}}>
                {MENU_OPTIONS.map(function ({text, pageId, keepPageState}) {
                    return (
                        <Link key={pageId}
                              keepPageState={keepPageState}
                              triggerEvent={triggerEvent}
                              className={classNames("item", appState.pageId === pageId && "active")}
                              href={getUrl(pageId)}>
                            {text}
                        </Link>
                    );
                })}
            </div>
            <div style={{flexGrow: 1, marginLeft: "2rem"}}>
                <PageComponent {...props}/>
            </div>
        </div>
    </div>
}