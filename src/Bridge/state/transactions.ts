import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCookie } from '../utils';

export const transactionSlice = createSlice({
    name:'transaction',
    initialState:{
        approvedAmt: 0,
        approvedHash: '',
        transferHash: '',
        transferSuccess: false,
        destinationAddress:'',
        transferAmount:0,
        pending: false,
    },
    reducers:{
        setDestinationAccount:(state:any, action) => {
            state.destinationAddress = action.payload;
            addCookie({key:"toAddress", value:action.payload, ...state.cookieExpires})
        },
        setTransferAmount:(state:any, action) => {
            state.transferAmount = action.payload;
            addCookie({key:"transferAmount", value:action.payload, ...state.cookieExpires})
        }
    },
    extraReducers: (builder: any) => {
        builder
    }
});

export const {
    setDestinationAccount,
    setTransferAmount,
} = transactionSlice.actions;