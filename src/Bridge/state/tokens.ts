import { /*createAsyncThunk,*/ createSlice } from '@reduxjs/toolkit';
import { addCookie } from '../utils';
import {TestnetTokenNames,testnetTokens} from 'emmet.sdk';

export const tokenSlice = createSlice({
    name:'token',
    initialState:{
        fromTokens:TestnetTokenNames[0],
        fromTokensLogo:testnetTokens[TestnetTokenNames[0]].logo,
        isApproved:false,
        supportedTokens: testnetTokens,
        tokenAllowance: 0,
        tokenBalance:0,
        toTokens:TestnetTokenNames[0],
        toTokensLogo:testnetTokens[TestnetTokenNames[0]].logo,
    },
    reducers:{
        setFromTokens:(state:any, action) => {
            state.fromTokens = action.payload;
            // @ts-ignore
            state.fromTokensLogo = TokenLogos[action.payload];
            addCookie({key:"fromTokens", value:state.fromTokens, ...state.cookieExpires});
        },
        setToTokens:(state:any, action) => {
            state.toTokens = action.payload;
            // @ts-ignore
            state.toTokensLogo = TokenLogos[action.payload];
            addCookie({key:"toTokens", value:state.toTokens, ...state.cookieExpires});
        },
    },
    // extraReducers: (builder: any) => {
    //     builder
    // }
});

export const {
    setFromTokens,
    setToTokens,
} = tokenSlice.actions;