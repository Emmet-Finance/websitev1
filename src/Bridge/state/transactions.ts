import { /*createAsyncThunk,*/ createSlice } from '@reduxjs/toolkit';
import { addCookie } from '../utils';

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        approvedAmt: 0,
        approvedHash: '',
        approveSuccess: false,
        destinationAddress: '',
        destinationHash: '',
        estimationDestination: "",
        estimationNative: "",
        originalHash: '',
        pending: false,
        slippage: 0.5,
        transferAmount: 0,
        transferSuccess: false,
    },
    reducers: {
        setApprovedAmount: (state: any, action) => {
            state.approvedAmt = action.payload;
        },
        setApprovedHash: (state: any, action) => {
            state.approvedHash = action.payload;
        },
        setApprovedSuccess: (state: any, action) => {
            state.approveSuccess = action.payload;
        },
        setDestinationAccount: (state: any, action) => {
            state.destinationAddress = action.payload;
            addCookie({
                key: "toAddress",
                value: action.payload,
                ...state.cookieExpires
            })
        },
        setDestinationHash: (state: any, action) => {
            state.destinationHash = action.payload;
        },
        setOriginalHash: (state: any, action) => {
            state.originalHash = action.payload;
        },
        setPending: (state: any, action) => {
            state.pending = action.payload;
        },
        setSlippage: (state: any, action) => {
            state.slippage = action.payload;
            addCookie({
                key: "slippage",
                value: action.payload,
                ...state.cookieExpires
            })
        },
        setTransferAmount: (state: any, action) => {
            state.transferAmount = action.payload;
        },
        setTransferSuccess: (state: any, action) => {
            state.transferSuccess = action.payload;
        }
    },
    // extraReducers: (builder: any) => {
    //     builder
    // }
});

export const {
    setApprovedAmount,
    setApprovedHash,
    setApprovedSuccess,
    setDestinationAccount,
    setDestinationHash,
    setPending,
    setSlippage,
    setTransferAmount,
    setTransferSuccess,
} = transactionSlice.actions;