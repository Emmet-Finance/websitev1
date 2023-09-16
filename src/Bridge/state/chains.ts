import { /*createAsyncThunk,*/ createSlice } from '@reduxjs/toolkit';
import { addCookie, findChain } from '../utils';
import { EVMChain } from 'emmet.sdk/types';
import { ALL_CHAINS } from 'emmet.sdk';
import { switchEvmChain } from '../wallets/switchEvmChain';

const startingFromChain: EVMChain = ALL_CHAINS['goerli'];
const startingToChain: EVMChain = ALL_CHAINS["mumbai"];

export const chainSlice = createSlice({
    name: 'chain',
    initialState: {
        // General
        isTestnet: true,
        supportedChains: ALL_CHAINS,
        // From Chain
        chainId: startingFromChain.id,
        fromChain: startingFromChain.name,
        fromChainLogo: startingFromChain.logo,
        nativeCurrency: startingFromChain.nativeCurrency.symbol,
        // To chain
        toChain: startingToChain.name,
        toChainLogo: startingToChain.logo,
    },
    reducers: {
        setFromChain: (state: any, action) => {
            if (state.fromChain !== action.payload) {
                state.fromChain = action.payload;
                switchEvmChain(action.payload);
                const _chain = findChain(state.supportedChains, action.payload)
                state.fromChainLogo = _chain.logo;
                state.nativeCurrency = _chain.nativeCurrency.symbol;
                state.chainId = _chain.id;
                addCookie({ key: "fromChain", value: state.fromChain, ...state.cookieExpires });
            }
        },
        setToChain: (state: any, action) => {
            state.toChain = action.payload;
            state.toChainLogo = findChain(state.supportedChains, action.payload).logo;
            addCookie({ key: "toChain", value: state.toChain, ...state.cookieExpires });
        },
    },
    // extraReducers: (builder: any) => {
    //     builder
    // }
});

export const {
    setFromChain,
    setToChain,
} = chainSlice.actions;