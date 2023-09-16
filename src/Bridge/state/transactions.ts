import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCookie } from '../utils';
import { approveERC20 } from '../wallets/approveERC20'
import { transferERC20 } from '../wallets/transferERC20'
import { getReceiveAmount } from '../wallets/getReceiveAmount';

export const approveAmount = createAsyncThunk('approve-amount', async (params: any) => {

    const { hash, status, amount } = await approveERC20(
        params.fromChain,
        params.approvedAmt,
        params.fromTokens,
        params.sender
    );

    return { hash, status, amount }
});

export const sendInstallment = createAsyncThunk('send-installment', async (params: any) => {
    const { hash, status, amount } = await transferERC20(
        params.fromChain,
        params.toChain,
        params.fromTokens,
        params.transferAmount,
        params.destinationAddress
    );
    return { hash, status, amount }
});

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        approvedAmt: '',
        approvedHash: '',
        approveSuccess: true,
        destinationAddress: '',
        destinationFee: 0,
        destinationHash: '',
        estimationDestination: "",
        estimationNative: "",
        nativeFee: 0,
        originalHash: '',
        pending: false,
        requireApproval: false,
        receiveAmount: "",
        slippage: 0,
        transferAmount: '',
        transferSuccess: '',
    },
    reducers: {
        setApprovedAmount: (state: any, action) => {
            state.approvedAmt = action.payload;
            if (state.transferAmount < state.approvedAmt) {
                state.requireApproval = true;
            } else {
                state.requireApproval = false;
            }
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
        setDestinationFee: (state: any, action) => {
            state.destinationFee = action.payload;
        },
        setDestinationHash: (state: any, action) => {
            state.destinationHash = action.payload;
        },
        setNativeFee: (state: any, action) => {
            state.nativeFee = action.payload;
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
            if (state.transferAmount < state.approvedAmt) {
                state.requireApproval = true;
            } else {
                state.requireApproval = false;
            }
            if(state.transferAmount){
                state.receiveAmount = getReceiveAmount(state.transferAmount, state.slippage);
            } else{
                state.receiveAmount = '';
            }
        },
        setTransferSuccess: (state: any, action) => {
            state.transferSuccess = action.payload;
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(sendInstallment.fulfilled, (state: any, action: any) => {
                const { hash, status, amount } = action.payload
                state.originalHash = hash;
                state.transferSuccess = status;
                state.receiveAmount = amount;
                state.pending = false;
            })
            .addCase(sendInstallment.pending, (state: any) => {
                state.pending = true;
                state.originalHash = '';
                state.transferSuccess = '';
                state.receiveAmount = '';
            })
            .addCase(sendInstallment.rejected, (state: any) => {
                state.pending = false;
                state.originalHash = '';
                state.transferSuccess = '';
                state.receiveAmount = '';
            })
            .addCase(approveAmount.fulfilled, (state: any, action: any) => {
                const { hash, status, amount } = action.payload;
                if (status === 1) { //1 - success, 0 - reverted
                    state.approvedHash = hash;
                    state.approveSuccess = true;
                    state.approvedAmt = amount;
                    state.pending = false;
                } else {
                    state.approvedHash = '';
                    state.approveSuccess = false;
                    state.pending = false;
                }

            })
            .addCase(approveAmount.pending, (state: any) => {
                state.approvedHash = '';
                state.approveSuccess = '';
                state.pending = true;
            })
            .addCase(approveAmount.rejected, (state: any) => {
                state.approvedHash = '';
                state.approveSuccess = '';
                state.pending = false;
                console.error("Approve error")
            })
    }
});

export const {
    setApprovedAmount,
    setApprovedHash,
    setApprovedSuccess,
    setDestinationAccount,
    setDestinationFee,
    setDestinationHash,
    setNativeFee,
    setOriginalHash,
    setPending,
    setSlippage,
    setTransferAmount,
    setTransferSuccess,
} = transactionSlice.actions;