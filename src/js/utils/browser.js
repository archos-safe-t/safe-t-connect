/* @flow */
'use strict';

import * as bowser from 'bowser';
import DataManager from '../data/DataManager';

type State = {
    name: string;
    supported: boolean;
    outdated: boolean;
    mobile: boolean;
}

export const state: State = {
    name: 'unknown',
    supported: false,
    outdated: false,
    mobile: false,
}

export const checkBrowser = (): State => {
    const supported = DataManager.getConfig().supportedBrowsers;
    state.name = `${bowser.name}: ${bowser.version}; ${bowser.osname}: ${bowser.osversion};`;
    state.mobile = bowser.mobile;
    if (bowser.mobile && typeof navigator.usb === 'undefined') {
        state.supported = true;
    } else {
        const isSupported: any = supported[ bowser.name.toLowerCase() ];
        if (isSupported) {
            state.supported = true;
            state.outdated = isSupported.version > parseInt(bowser.version, 10);
        }
    }
    return state;
}
