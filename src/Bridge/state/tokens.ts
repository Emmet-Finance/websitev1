import { createSlice } from '@reduxjs/toolkit';
import { addCookie } from '../utils';
import {TestnetTokenNames,testnetTokens} from 'emmet.sdk';

export const tokenSlice = createSlice({
    name:'token',
    initialState:{
        fromTokens:TestnetTokenNames[0],
        fromTokensLogo:testnetTokens[TestnetTokenNames[0]].logo,
        isApproved:false,
        supportedTokens: testnetTokens,
        tokenAllowances: undefined,
        fromTokenBalances:undefined,
        toTokenBalances:undefined,
        toTokens:TestnetTokenNames[0],
        toTokensLogo:testnetTokens[TestnetTokenNames[0]].logo,
    },
    reducers:{
        setFromTokens:(state:any, action) => {
            state.fromTokens = action.payload;
            state.toTokens = action.payload;
            // @ts-ignore
            state.fromTokensLogo = testnetTokens[action.payload.toUpperCase()].logo;
            // @ts-ignore
            state.toTokensLogo = testnetTokens[action.payload.toUpperCase()].logo;
            addCookie({key:"fromTokens", value:state.fromTokens, ...state.cookieExpires});
        },
        setToTokens:(state:any, action) => {
            state.fromTokens = action.payload;
            state.toTokens = action.payload;
            // @ts-ignore
            state.fromTokensLogo = testnetTokens[action.payload.toUpperCase()].logo;
            // @ts-ignore
            state.toTokensLogo = testnetTokens[action.payload.toUpperCase()].logo;
            addCookie({key:"toTokens", value:state.toTokens, ...state.cookieExpires});
        },
        setFromTokenBalances:(state:any, action) => {
            state.fromTokenBalances = action.payload;
            console.log("Balances:", action.payload)
        },
        setFromTokenAllowances:(state:any, action) => {
            state.tokenAllowances = action.payload;
            console.log("allowances:", action.payload)
        },
    },
});

export const {
    setFromTokenAllowances,
    setFromTokens,
    setFromTokenBalances,
    setToTokens,
} = tokenSlice.actions;