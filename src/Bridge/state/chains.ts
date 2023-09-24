import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCookie, findChain } from '../utils';
import { EVMChain } from 'emmet.sdk/types';
import { ALL_CHAINS } from 'emmet.sdk';
import { switchEvmChain } from '../wallets/switchEvmChain';

export const setFromChain = createAsyncThunk('set-from-chain', async (fromChain: string) => {

    await switchEvmChain(fromChain)
    return { fromChain }

})

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
        error: '',
        pending: false,
    },
    reducers: {
        setToChain: (state: any, action) => {
            state.toChain = action.payload;
            state.toChainLogo = findChain(state.supportedChains, action.payload).logo;
            addCookie({ key: "toChain", value: state.toChain, ...state.cookieExpires });
        },
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(setFromChain.fulfilled, (state: any, action: any) => {
                state.fromChain = action.payload.fromChain;
                const _chain = findChain(state.supportedChains, state.fromChain)
                state.fromChainLogo = _chain.logo;
                state.nativeCurrency = _chain.nativeCurrency.symbol;
                state.chainId = _chain.id;
                addCookie({ key: "fromChain", value: state.fromChain, ...state.cookieExpires });
                state.pending = false;
                state.error = '';
            })
            .addCase(setFromChain.pending, (state: any) => {
                state.pending = true;
                state.error = '';
            })
            .addCase(setFromChain.rejected, (state: any) => {
                state.pending = false;
                state.error = 'Failed to switch chains';
            })
    }
});

export const {
    setToChain,
} = chainSlice.actions;