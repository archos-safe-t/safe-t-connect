/* @flow */

import { Core, init as initCore, initTransport } from '../../js/core/Core.js';
import { checkBrowser } from '../../js/utils/browser';
import { settings, CoreEventHandler } from './common.js';

import type {
    TestGetAddressPayload,
    ExpectedGetAddressResponse,
} from 'flowtype/tests/get-address';

export const getAddressSegwit = (): void => {
    describe('GetAddressSegwit', () => {
        let core: Core;

        const testPayloads: Array<TestGetAddressPayload> = [
            {
                method: 'getAddress',
                coin: 'Bitcoin',
                path: "m/49'/0'/0'/0/0",
                showOnTrezor: true,
            },
            {
                method: 'getAddress',
                coin: 'Bitcoin',
                path: "m/49'/0'/0'/0/1",
                showOnTrezor: true,
            },
            {
                method: 'getAddress',
                coin: 'Bitcoin',
                path: "m/49'/0'/0'/1/0",
                showOnTrezor: true,
            },
            {
                method: 'getAddress',
                coin: 'Bitcoin',
                path: "m/49'/0'/0'/1/1",
                showOnTrezor: true,
            },
        ];
        const expectedResponses: Array<ExpectedGetAddressResponse> = [
            {
                payload: {
                    address: '3AnYTd2FGxJLNKL1AzxfW3FJMntp9D2KKX',
                },
            },
            {
                payload: {
                    address: '3CBs2AG2se3c3DxASUfgZE3PPwpMW1JhYp',
                },
            },
            {
                payload: {
                    address: '3DDuECA7AomS7GSf5G2NAF6djKEqF2qma5',
                },
            },
            {
                payload: {
                    address: '33Levhyt79XBK68BwyK61y5F1tE2ia7nZR',
                },
            },
        ];

        beforeEach(async (done) => {
            core = await initCore(settings);
            checkBrowser();
            done();
        });
        afterEach(() => {
            // Deinitialize existing core
            core.onBeforeUnload();
        });

        if (testPayloads.length !== expectedResponses.length) {
            throw new Error('Different number of payloads and expected responses');
        }

        for (let i = 0; i < testPayloads.length; i++) {
            const payload = testPayloads[i];
            const expectedResponse = expectedResponses[i];

            it(`for derivation path: "[${payload.path.toString()}]"`, async (done) => {
                const handler = new CoreEventHandler(core, payload, expectedResponse, expect, done);
                handler.startListening();
                await initTransport(settings);
            });
        }
    });
};
