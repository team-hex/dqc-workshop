import React from "react";
import {render} from '@testing-library/react';
import Link, {handleClick} from "./Link";
import {assertElement, getElementAttribute} from "../testUtil";
import {triggerClick} from "../testUtil";

describe("Link", function () {
    it("Should render props correctly", function () {
        const utils = render(<Link href="/a" text="Test" title="Foo" target="bar" className="baz"/>);
        expect(assertElement(utils, "Test")).toBeTruthy();
        expect(getElementAttribute(utils, "Test", "href")).toBe("/a");
        expect(getElementAttribute(utils, "Test", "title")).toBe("Foo");
        expect(getElementAttribute(utils, "Test", "target")).toBe("bar");
        expect(getElementAttribute(utils, "Test", "class")).toBe("baz");
    });

    it("Should trigger navigation event when clicked", function () {
        const triggerEventFn = jest.fn();

        const utils = render(<Link href="/a" text="Test" triggerEvent={triggerEventFn}/>);
        triggerClick(utils, "Test");
        expect(triggerEventFn).toHaveBeenCalledWith("navigate", {url: "/a"});
    });

    it("Should be able to keep page state", function () {
        const triggerEventFn = jest.fn();

        const utils = render(<Link href="/a" text="Test" keepPageState triggerEvent={triggerEventFn}/>);
        triggerClick(utils, "Test");
        expect(triggerEventFn).toHaveBeenCalledWith("navigate", {url: "/a", keepPageState: true});
    });

    it("Should also trigger onClick when clicked", function () {
        const onClickFn = jest.fn();
        const triggerEventFn = jest.fn();

        const utils = render(<Link href="/a" text="Test" triggerEvent={triggerEventFn} onClick={onClickFn}/>);
        triggerClick(utils, "Test");
        expect(triggerEventFn).toHaveBeenCalledWith("navigate", {url: "/a"});
        expect(onClickFn).toHaveBeenCalled();
    });

    describe("handleClick", function () {
        it("Default <a> tag behavior should be prevented when clicked", function () {
            const triggerEventFn = jest.fn();
            const preventDefaultFn = jest.fn();
            handleClick({
                triggerEvent: triggerEventFn
            }, {button: 0, preventDefault: preventDefaultFn});
            expect(triggerEventFn).toHaveBeenCalledTimes(1);
            expect(preventDefaultFn).toHaveBeenCalledTimes(1);
        });


        it("event.defaultPrevented should hinder navigation event", function () {
            const triggerEventFn = jest.fn();
            handleClick({
                triggerEvent: triggerEventFn
            }, {defaultPrevented: true});
            expect(triggerEventFn).toHaveBeenCalledTimes(0);
        });

        it("Only primary mouse button clicks result in navigation event", function () {
            const triggerEventFn = jest.fn();
            const preventDefaultFn = jest.fn();

            handleClick({
                triggerEvent: triggerEventFn
            }, {button: 1, preventDefault: preventDefaultFn});
            expect(triggerEventFn).toHaveBeenCalledTimes(0);
            expect(preventDefaultFn).toHaveBeenCalledTimes(0);

            handleClick({
                triggerEvent: triggerEventFn
            }, {button: 0, preventDefault: preventDefaultFn});
            expect(triggerEventFn).toHaveBeenCalledTimes(1);
            expect(preventDefaultFn).toHaveBeenCalledTimes(1);
        });
    });
});
