import {TEnvironment} from 'emmet.sdk';

import { /*createAsyncThunk,*/ createSlice } from '@reduxjs/toolkit';

export const miscelaneousSlice = createSlice({
    name:'state',
    initialState: {
        error: '',
        environment:TEnvironment,
        cookieExpires:{days:0,hours:1,minutes:0,seconds:0}
    },
    reducers:{
        
        clearState: (state: any) => {
            state.approvedAmt = 0;
            state.approvedHash = '';
            state.transferHash = '';
            state.transferSuccess = false;
            state.error = '';
            state.pending = false;
        },

    },
    // extraReducers: (builder) => {
    //     builder
    // }
});

export const {
    clearState
} = miscelaneousSlice.actions;