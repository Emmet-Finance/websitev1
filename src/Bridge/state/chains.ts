import { /*createAsyncThunk,*/ createSlice } from '@reduxjs/toolkit';
import { addCookie, findChain } from '../utils';
import {EVMChain} from 'emmet.sdk/types';
import { ALL_CHAINS } from 'emmet.sdk';

const startingFromChain: EVMChain = ALL_CHAINS['goerli'];
const startingToChain: EVMChain = ALL_CHAINS["mumbai"];

export const chainSlice = createSlice({
    name:'chain',
    initialState:{
        chainId: startingFromChain.id,
        fromChain:startingFromChain.name,
        fromChainLogo:startingFromChain.logo,
        isTestnet: true,
        nativeCurrency:startingFromChain.nativeCurrency.symbol,
        supportedChains: ALL_CHAINS,
        toChain:startingToChain.name,
        toChainLogo:startingToChain.logo,
    },
    reducers:{
        setFromChain:(state:any, action) => {
            state.fromChain = action.payload;
            const _chain = findChain(ALL_CHAINS, action.payload)
            state.fromChainLogo = _chain.logo;
            state.nativeCurrency = _chain.nativeCurrency.symbol;
            addCookie({key:"fromChain", value:state.fromChain, ...state.cookieExpires});
        },
        setToChain:(state:any, action) => {
            state.toChain = action.payload;
            state.toChainLogo = findChain(ALL_CHAINS, action.payload).logo;
            addCookie({key:"toChain", value:state.toChain, ...state.cookieExpires});
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