// External imports
import { createSlice } from '@reduxjs/toolkit';
import {testnetTokens, TestnetTokenNames} from 'emmet.sdk';
// Local imports
import { addCookie } from '../utils';

export const tokenSlice = createSlice({
    name:'token',
    initialState:{
        fromDecimals:testnetTokens[TestnetTokenNames[0]].decimals,
        fromTokens:TestnetTokenNames[0],
        fromTokensLogo:testnetTokens[TestnetTokenNames[0]].logo,
        isApproved:false,
        supportedTokens: testnetTokens,
        tokenAllowances: {},
        fromTokenBalances:{},
        toDecimals:testnetTokens[TestnetTokenNames[0]].decimals,
        toTokenBalances:undefined,
        toTokens:TestnetTokenNames[0],
        toTokensLogo:testnetTokens[TestnetTokenNames[0]].logo,
    },
    reducers:{
        setFromTokens:(state:any, action) => {
            if(action.payload){
                state.fromTokens = action.payload;
                state.toTokens = action.payload;
                // @ts-ignore
                state.fromTokensLogo = testnetTokens[action.payload.toUpperCase()].logo;
                // @ts-ignore
                state.toTokensLogo = testnetTokens[action.payload.toUpperCase()].logo;
                // @ts-ignore
                state.fromDecimals = testnetTokens[action.payload.toUpperCase()].decimals;
                // @ts-ignore
                state.toDecimals = testnetTokens[action.payload.toUpperCase()].decimals;
                addCookie({key:"fromTokens", value:state.fromTokens, ...state.cookieExpires});
                addCookie({key:"toTokens", value:state.toTokens, ...state.cookieExpires});
            }
        },
        setToTokens:(state:any, action) => {
            if(action.payload){
                state.fromTokens = action.payload;
                state.toTokens = action.payload;
                // @ts-ignore
                state.fromTokensLogo = testnetTokens[action.payload.toUpperCase()].logo;
                // @ts-ignore
                state.toTokensLogo = testnetTokens[action.payload.toUpperCase()].logo;
                // @ts-ignore
                state.fromDecimals = testnetTokens[action.payload.toUpperCase()].decimals;
                // @ts-ignore
                state.toDecimals = testnetTokens[action.payload.toUpperCase()].decimals;
                addCookie({key:"fromTokens", value:state.fromTokens, ...state.cookieExpires});
                addCookie({key:"toTokens", value:state.toTokens, ...state.cookieExpires});
            }
        },
    },
});

export const {
    setFromTokens,
    setToTokens,
} = tokenSlice.actions;