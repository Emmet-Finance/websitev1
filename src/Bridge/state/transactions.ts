import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCookie } from '../utils';
import { getTransaction, transferERC20 } from '../wallets/EVM';
import { approveERC20 } from '../wallets/ethers'

export const approveAmount = createAsyncThunk('approve-amount', async (params: any) => {
    console.log("params", params)
    const { hash, status, amount } = await approveERC20(
        params.fromChain,
        params.approvedAmt,
        params.fromTokens,
        params.sender
    );
    console.log(hash, status, amount)
    return { hash, status, amount }
});

export const sendInstallment = createAsyncThunk('send-installment', async (params: any) => {
    console.log("params", params)
    const txHash = await transferERC20(
        params.fromChain,
        params.toChain,
        params.fromTokens,
        params.transferAmount,
        params.destinationAddress
    );
    console.log("txHash", txHash)
    const TX = await getTransaction(
        params.fromChain,
        `0x${txHash.slice(2)}`
    );
    console.log("TX", TX)
    return { hash: txHash, status: TX.status }
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
            console.log("state.destinationAddress", state.destinationAddress)
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
        setReseiveAmount: (state: any, action) => {
            state.receiveAmount = action.payload;
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
        },
        setTransferSuccess: (state: any, action) => {
            state.transferSuccess = action.payload;
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(sendInstallment.fulfilled, (state: any, action: any) => {
                const { hash, status } = action.payload
                state.originalHash = hash;
                state.transferSuccess = status;
                state.pending = false;
            })
            .addCase(sendInstallment.pending, (state: any) => {
                state.pending = true;
                state.originalHash = '';
                state.transferSuccess = '';
            })
            .addCase(sendInstallment.rejected, (state: any) => {
                state.pending = false;
                state.originalHash = '';
                state.transferSuccess = '';
            })
            .addCase(approveAmount.fulfilled, (state: any, action: any) => {
                const { hash, status, amount } = action.payload;
                if (status === 1) { //1 - success, 0 - reverted
                    state.approvedHash = hash;
                    state.approveSuccess = true; 
                    state.approvedAmt = amount;
                    state.pending = false;
                }else{
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
    setReseiveAmount,
    setSlippage,
    setTransferAmount,
    setTransferSuccess,
} = transactionSlice.actions;