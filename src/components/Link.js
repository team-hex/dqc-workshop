/**
 * The Link component is a replacement for using <a> tags directly, since we have a Singe Page App.
 * Using <a> tags for linking to ours pages would reload the app, which is unwanted.
 * If you want to link to an external page, use a regular <a> tag instead.
 *
 * The Link component uses an <a> tag, but handles the onClick event differently.
 * When clicked, a navigation event is sent via the app `triggerEvent` system.
 *
 * Usual props:
 * - href
 * - text/children
 * - triggerEvent
 *
 * Extra props:
 * - onClick
 * - target
 * - className
 * - title
 */

import React from "react";

// Link onClick handling inspired by https://github.com/ReactTraining/react-router/blob/89a72d58ac55b2d8640c25e86d1f1496e4ba8d6c/packages/react-router-dom/modules/Link.js

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export function handleClick(props, event) {
    if (props.onClick) {
        props.onClick(event);
    }

    if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
        if (props.triggerEvent) {
            event.preventDefault();
            props.triggerEvent("navigate", {url: props.href, keepPageState: props.keepPageState});
        } else {
            console.warn("Non-external links require props.triggerEvent if e.preventDefault not handled by props.onClick");
        }
    }
}

function Link(props) {
    return (
        <a href={props.href}
           target={props.target}
           className={props.className}
           onClick={function (event) {
               return handleClick(props, event);
           }}
           title={props.title}
           data-testid={props.dataTestId}>
            {props.text || props.children}
        </a>
    );
}

export default Link;
