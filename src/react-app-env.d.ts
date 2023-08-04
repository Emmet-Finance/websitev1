/// <reference types="react-scripts" />

import {EthereumProvider} from 'emmet.sdk';

declare global {
    export interface Window {
        ethereum?: EthereumProvider;
    }
}

export declare let window: Window & typeof globalThis;