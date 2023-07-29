import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCookie } from '../utils';
import {
    // mainnets,
    testnets,
} from 'emmet.sdk';

export const chainSlice = createSlice({
    name:'chain',
    initialState:{
        chainId: testnets[0].id,
        fromChain:testnets[0].name,
        fromChainLogo:testnets[0].logo,
        isTestnet: true,
        supportedChains: testnets,
        toChain:testnets[1].name,
        toChainLogo:testnets[1].logo,
    },
    reducers:{
        setFromChain:(state:any, action) => {
            state.fromChain = action.payload;
            //@ts-ignore
            state.fromChainLogo = ChainLogos[action.payload];
            addCookie({key:"fromChain", value:state.fromChain, ...state.cookieExpires});
        },
        setToChain:(state:any, action) => {
            state.toChain = action.payload;
            //@ts-ignore
            state.toChainLogo = ChainLogos[action.payload];
            addCookie({key:"toChain", value:state.toChain, ...state.cookieExpires});
        },
    },
    extraReducers: (builder: any) => {
        builder
    }
});

export const {
    setFromChain,
    setToChain,
} = chainSlice.actions;