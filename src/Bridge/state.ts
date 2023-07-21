import {
    // mainnets,
    testnets,
    // MainnetTokenNames,
    TestnetTokenNames,
    TEnvironment,
    // mainnetTokens,
    testnetTokens,
} from 'emmet.sdk';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const stateSlice = createSlice({
    name:'state',
    initialState: {
        // Wallet
        account: '',
        accounts: [],
        approveSuccess: false,
        balance: undefined,
        isMetamask: false,
        isConnected: false,
        // Bridge Transaction
        approvedAmt: 0,
        approvedHash: '',
        transferHash: '',
        transferSuccess: false,
        destinationAddress:'',
        transferAmount:0,
        pending: false,
        // Chains
        chainId: testnets[0].id,
        fromChain:testnets[0].name,
        fromChainLogo:testnets[0].logo,
        isTestnet: true,
        supportedChains: testnets,
        toChain:testnets[1].name,
        toChainLogo:testnets[1].logo,
        // Tokens
        fromTokens:TestnetTokenNames[0],
        fromTokensLogo:testnetTokens[TestnetTokenNames[0]].logo,
        isApproved:false,
        supportedTokens: testnetTokens,
        tokenAllowance: 0,
        tokenBalance:0,
        toTokens:TestnetTokenNames[0],
        toTokensLogo:testnetTokens[TestnetTokenNames[0]].logo,
        // Misc
        error: '',
        cookieExpires:{days:0,hours:1,minutes:0,seconds:0}
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder
    }
});