import {fireEvent, wait} from '@testing-library/react';

export function assertElement(utils, testIdOrTextMatcher) {
    return utils.queryByTestId(testIdOrTextMatcher) || utils.queryByText(testIdOrTextMatcher);
}

export function getElementAttribute(utils, testIdOrTextMatcher, attribute) {
    let element;

    if (utils.queryByTestId(testIdOrTextMatcher)) {
        element = utils.getByTestId(testIdOrTextMatcher);
    } else {
        element = utils.getByText(testIdOrTextMatcher);
    }

    if (!element) {
        throw new Error('Cannot find element' + testIdOrTextMatcher);
    }

    return element.getAttribute(attribute);
}

export function assertValue(utils, testIdOrTextMatcher, value) {
    if (utils.queryByTestId(testIdOrTextMatcher)) {
        return utils.getByTestId(testIdOrTextMatcher).value === value;
    } else {
        return utils.getByText(testIdOrTextMatcher).value === value;
    }
}

export function triggerClick(utils, testIdOrTextMatcher) {
    if (utils.queryByTestId(testIdOrTextMatcher)) {
        fireEvent.click(utils.getByTestId(testIdOrTextMatcher));
    } else {
        fireEvent.click(utils.getByText(testIdOrTextMatcher));
    }
}

export function setValue(utils, testIdOrTextMatcher, value) {
    if (utils.queryByTestId(testIdOrTextMatcher)) {
        fireEvent.change(utils.getByTestId(testIdOrTextMatcher), {target: {value: value}})
    } else {
        fireEvent.change(utils.getByText(testIdOrTextMatcher), {target: {value: value}})
    }
}

export function waitFor(utils, testIdOrTextMatcher) {
    return wait(function () {
        if (utils.queryByTestId(testIdOrTextMatcher)) {
            return utils.getByTestId(testIdOrTextMatcher);
        } else {
            return utils.getByText(testIdOrTextMatcher);
        }
    }, {
        timeout: 2000
    });
}

export function waitForValue(utils, testIdOrTextMatcher, value) {
    return wait(function () {
        if (utils.queryByTestId(testIdOrTextMatcher)) {
            return utils.getByTestId(testIdOrTextMatcher).value === value;
        } else {
            return utils.getByText(testIdOrTextMatcher).value === value;
        }
    }, {
        timeout: 2000
    });
}
