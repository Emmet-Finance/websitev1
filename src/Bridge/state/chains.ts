import { /*createAsyncThunk,*/ createSlice } from '@reduxjs/toolkit';
import { addCookie, findChain } from '../utils';
import {testnets} from 'emmet.sdk';

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
            state.fromChainLogo = findChain(testnets, action.payload).logo;
            addCookie({key:"fromChain", value:state.fromChain, ...state.cookieExpires});
        },
        setToChain:(state:any, action) => {
            state.toChain = action.payload;
            state.toChainLogo = findChain(testnets, action.payload).logo;
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